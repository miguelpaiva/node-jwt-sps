exports.up = function (knex) {
  return knex.schema.createTable("clients", (table) => {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("whatsapp").notNullable();
    table.string("sector").notNullable();

    table.string("company_id").notNullable();
    table.foreign("company_id").references("id").inTable("companies");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("clients");
};
