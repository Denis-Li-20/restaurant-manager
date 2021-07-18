const { response } = require("express");
const { readReservationService } = require("../reservations/reservations.service");
const { updateReservationService } = require("../reservations/reservations.service");
const tablesService = require("./tables.service");
const reservationsService = require("./../reservations/reservations.service");

// this validation can potentially be merged with tableValid validation
async function seatValid (request, response, next) {
    const { data = {} } = request.body;

    // checking if the request contains the data required to get reservation and table
    if (!data) return next ({ status: 400, message: `Data is missing!` });
    if (!data.reservation_id) return next ({ status: 400, message: `reservation_id is missing!`});

    // getting reservation and table details
    const reservation = await reservationsService.readReservationService(data.reservation_id);
    const table = await tablesService.readTableService(request.params.tableId);

    // reservation does not exist
    if (!reservation) return next ({ status: 404, message: `reservation_id (${data.reservation_id}) does not exist!`});
    // reservation is finished
    if (reservation.status === "seated") return next ({ status: 400, message: `Reservation ${data.reservation_id} is already seated!`});
    // table is too small
    if (reservation.people > table.capacity) return next ({ status: 400, message: `table does not have sufficient capacity!`});
    // table is occupied (reservation_id exists)
    if (table.reservation_id) return next ({ status: 400, message: `table is occupied`});

    // passing 2 paremeters for seatTable to locals
    response.locals.reservation_id = data.reservation_id;
    response.locals.table_id = request.params.tableId;
    next();
}
// this validation can potentially be merged with tableValid validation
async function createSeat (request, response, next) {
    const reservationId = parseInt(response.locals.reservation_id);
    const data = await tablesService.createSeatService(response.locals.table_id, reservationId);
    let reservation = await reservationsService.readReservationService(reservationId);
    reservation.status = "seated";
    reservation.table_id = response.locals.table_id;
    await  reservationsService.updateReservationService(reservation);
    response.status(200).json({ data });
}

// keep this separate
async function deleteSeatValidation (request, response, next) {
    const table = await tablesService.readTableService(request.params.tableId);
    if(!table) return next ({ status: 404, message: `table_id ${request.params.tableId}`})
    if(!table.reservation_id) return next ({ status: 400, message: `Table ${request.params.tableId} is not occupied!` });
    response.locals.table = table;
    next();
}

async function deleteSeat (request, response, next) {
    let reservation = await reservationsService.readReservationService(response.locals.table.reservation_id);
    reservation.status = "finished";
    await reservationsService.updateReservationService(reservation);
    await tablesService.deleteSeatService(request.params.tableId);
    response.sendStatus(200);
}

function tableValid (request, response, next) {
    const { data = {} } = request.body;

    // use switch (for > 4 if statements)
    // data is missing
    if (!data) return next ({ status: 400, message: `Data is missing!` })
    // table_name is missing or empty
    if (!data.table_name) return next ({ status: 400, message: `table_name is missing!`})
    // table_name is one character
    if (data.table_name.length === 1) return next ({ status: 400, message: `table_name is too short!`})
    // capacity is missing
    if (!data.capacity) return next ({ status: 400, message: `table_capacity is missing!`})
    // capacity is zero
    if (data.capacity === 0) return next ({ status: 400, message: `table_capacity should not equal 0!`})
    // capacity is not a number
    if (!Number.isInteger(data.capacity)) return next ({ status: 400, message: `table_capacity should be a number!`})
    next ();
}

async function createTable (request, response, next) {
    // tables sorted by table name
    const [data] = await tablesService.createTableService(request.body.data);
    response.status(201).json({ data });
}

async function listTables (request, response, next) {
    const data = await tablesService.listTablesService();
    response.json({ data });
}

async function tableExists (request, response, next) {
    const table = await tablesService.readTableService(request.params.tableId);
    if (table) {
        response.locals.table = table;
        return next ();
    }
    next ({ status: 404, message: `Table ${request.params.tableId} cannot be found`});
}

function readTable (request, response, next) {
    // tables were aquired during tableExists validation
    const { tables: data } = response.locals;
    response.json({ data });
}

// router order, grouped by routes
module.exports = {

    createSeat: [
        seatValid,
        createSeat,
    ],

    deleteSeat: [
        deleteSeatValidation,
        deleteSeat,
    ],

    createTable: [
        tableValid,
        createTable,
    ],

    listTables,

    readTable: [
        tableExists,
        readTable,
    ],
};