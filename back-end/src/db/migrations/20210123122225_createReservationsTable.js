exports.up = function (knex) {
  // should be a way to truncate the date / time fields
  return knex.schema.createTable("reservations", (table) => {
    table.increments("reservation_id").primary();
    table.string("first_name");
    table.string("last_name");
    table.string("mobile_number");
    table.string("status").defaultTo("booked");
    table.string("table_id").defaultTo("");
    table.date("reservation_date");
    table.time("reservation_time");
    table.integer("people");
    table.timestamps(true, true);
  });
};

// this is not the same as rollback
exports.down = function (knex) {
  return knex.schema.dropTable("reservations");
};
