exports.up = function (knex) {
  return knex.schema.createTable("companies", (table) => {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("phone").notNullable();
    table.string("description").notNullable();

    table.string("user_id").notNullable();
    table.foreign("user_id").references("id").inTable("users");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("companies");
};
