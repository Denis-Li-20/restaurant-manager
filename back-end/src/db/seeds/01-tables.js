
exports.seed = function(knex) {
  return knex
    .raw("TRUNCATE TABLE tables RESTART IDENTITY CASCADE")
    .then(function () {
      // Inserts seed entries
      return knex('tables').insert([
        {"table_name" : "Bar #1", "capacity" : "1"},
        {"table_name" : "Bar #2", "capacity" : "1"},
        {"table_name" : "Bar #3", "capacity" : "1"},
        {"table_name" : "Bar #4", "capacity" : "1"},
        {"table_name" : "Bar #5", "capacity" : "1"},
        {"table_name" : "Bar #6", "capacity" : "1"},
        {"table_name" : "Bar #7", "capacity" : "1"},
        {"table_name" : "Bar #8", "capacity" : "1"},
        {"table_name" : "#1", "capacity" : "6"},
        {"table_name" : "#2", "capacity" : "6"},
        {"table_name" : "#3", "capacity" : "5"},
        {"table_name" : "#4", "capacity" : "4"},
        {"table_name" : "#5", "capacity" : "4"},
        {"table_name" : "#6", "capacity" : "4"},
        {"table_name" : "#7", "capacity" : "2"},
        {"table_name" : "#8", "capacity" : "2"},
        {"table_name" : "#9", "capacity" : "2"},
        {"table_name" : "#10", "capacity" : "2"},
      ]);
    });
}; 

/*
// this seed is meant for Thinkful tests
exports.seed = function(knex) {
  return knex
    .raw("TRUNCATE TABLE tables RESTART IDENTITY CASCADE")
    .then(function () {
      // Inserts seed entries
      return knex('tables').insert([
        {"table_name" : "Bar #1", "capacity" : "1"},
        {"table_name" : "Bar #2", "capacity" : "1"},
        {"table_name" : "#1", "capacity" : "6"},
        {"table_name" : "#2", "capacity" : "6"},
      ]);
    });
};
*/