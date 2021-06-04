require('dotenv').config();

const { DATABASE_URL, USE_SSL } = process.env;

const pg = require('knex')({
  client: 'pg',
  connection: DATABASE_URL,
  ssl: USE_SSL === 'true',
});

const {
  withOrderBy,
  constructSelectWithJoins,
  applyJoinsToQuery,
} = require('./db-utils');

const select = async (table, args, offset, limit, orderBy, orderDir) =>
  withOrderBy(
    pg(table)
      .where(args || true)
      .offset(offset || 0)
      .limit(limit || null),
    orderBy,
    orderDir
  );

const selectWithJoin = async (
  table,
  tableColumns,
  joins,
  args,
  offset,
  limit,
  orderBy,
  orderDir
) =>
  withOrderBy(
    applyJoinsToQuery(
      pg
        .select(constructSelectWithJoins(table, tableColumns, joins))
        .from(table),
      joins
    )
      .where(args || true)
      .offset(offset || 0)
      .limit(limit || null),
    orderBy,
    orderDir
  );

const insert = (table, args) => pg(table).insert(args).returning('*');

const update = (table, args, id) =>
  pg(table).update(args).where('id', '=', id).returning('*');

const count = (table, column) => pg(table).count(column).first();

const deleteRecords = (table, args) => pg(table).where(args).del();

module.exports = {
  select,
  insert,
  update,
  selectWithJoin,
  count,
  deleteRecords,
};
