require('dotenv').config();

const { PG_CONNECTION_STRING } = process.env;
const pg = require('knex')({
  client: 'pg',
  connection: PG_CONNECTION_STRING,
});

const withOrderBy = async (args, orderBy, orderDir) =>
  orderBy ? args.orderBy(orderBy, orderDir || 'desc') : args;

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
  foreignKey,
  joinedTable,
  joinedTableColumns,
  args,
  offset,
  limit,
  orderBy,
  orderDir
) =>
  withOrderBy(
    pg
      .select([
        ...tableColumns.map((col) => `${table}.${col} as ${table}.${col} `),
        ...joinedTableColumns.map(
          (col) => `${joinedTable}.${col} as ${joinedTable}.${col}`
        ),
      ])
      .from(table)
      .innerJoin(joinedTable, `${table}.${foreignKey}`, `${joinedTable}.id`)
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
