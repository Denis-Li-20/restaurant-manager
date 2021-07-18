const knex = require("./../db/connection");

// reservations are listed by days, therefore, date is required
function listReservationsByDateService (date) {
    return knex("reservations")
        .select("*")
        .where({ reservation_date: date })
        .whereNot({ status: "finished"})
        .orderBy("reservation_time", "asc");
};

function listReservationsByMobileService (mobileNumber) {
    return knex("reservations")
        .select("*")
        .where( "mobile_number", "like", `%${mobileNumber}%`)
        .orderBy("reservation_time", "asc");
};

function createReservationService (reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*");
}

function readReservationService (reservationId) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: reservationId})
        .first();    
}

function updateReservationService (reservation) {
    return knex("reservations")
        .select("*")
        .where({ "reservation_id": reservation.reservation_id})
        .update(reservation, "*")
        .returning("*");
}

module.exports = {
    listReservationsByMobileService,
    listReservationsByDateService,
    createReservationService,
    readReservationService,
    updateReservationService,
};