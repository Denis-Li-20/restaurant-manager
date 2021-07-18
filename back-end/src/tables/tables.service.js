const knex = require ("./../db/connection");

function readTableService (table_id) {
    return knex ("tables")
        .select("*")
        .where({ table_id: table_id })
        .first();
};

function createTableService (table) {
    return knex ("tables")
        .insert(table)
        .returning(["table_name", "capacity", "table_id"])
};

function listTablesService () {
    return knex ("tables")
        .select("*")
        .orderBy("table_name");
};

function createSeatService (table_id, reservationId) {
    return knex ("tables")
        .select("*")
        .where({ table_id: table_id })
        .update({ "reservation_id": reservationId })
};

function deleteSeatService (table_id) {
    return knex("tables")
        .where({ table_id: table_id })
        .update( "reservation_id", null);
};

module.exports = {
    readTableService,
    createTableService,
    listTablesService,
    createSeatService,
    deleteSeatService,
};