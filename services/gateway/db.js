require('dotenv').config();

const { PG_CONNECTION_STRING } = process.env;
const pg = require('knex')({
  client: 'pg',
  connection: PG_CONNECTION_STRING,
});

const select = async (table, args) =>
  args ? pg(table).where(args) : pg(table);

const selectWithJoin = async (
  table,
  tableColumns,
  foreignKey,
  joinedTable,
  joinedTableColumns,
  args
) =>
  pg
    .select([
      ...tableColumns.map((col) => `${table}.${col} as ${table}.${col} `),
      ...joinedTableColumns.map(
        (col) => `${joinedTable}.${col} as ${joinedTable}.${col}`
      ),
    ])
    .from(table)
    .innerJoin(joinedTable, `${table}.${foreignKey}`, `${joinedTable}.id`)
    .where(args || true);

const insert = async (table, args) => pg(table).insert(args).returning('*');

module.exports = { select, insert, selectWithJoin };
