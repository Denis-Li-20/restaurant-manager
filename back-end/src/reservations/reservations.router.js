/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");
//
// Implement methodNotAllowed
//


router
        .route("/:reservationId/status")
        .put(controller.updateReservationStatus)

router
        .route("/:reservationId")
        .get(controller.readReservation)
        .put(controller.updateReservation);

router
        .route("/")
        .get(controller.listReservations)
        .post(controller.createReservation)

module.exports = router;




