const router = require("express").Router();
const controller = require("./tables.controller");
router
        .route("/:tableId/seat")
        .put(controller.createSeat)
        .delete(controller.deleteSeat)
router
        .route("/:tableId")
        .get(controller.readTable)

router
        .route("/")
        .get(controller.listTables)
        .post(controller.createTable)

module.exports = router;