require("dotenv").config();
const { SECRET_KEY, HOST, PORT, PG_CONNECTION_STRING } = process.env;
const pg = require("knex")({
  client: "pg",
  connection: PG_CONNECTION_STRING,
});

const select = async (table, args) =>
  args ? pg(table).where(args) : pg(table);

const insert = async (table, args) => pg(table).insert(args).returning("*");

module.exports = { select, insert };
