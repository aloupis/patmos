require('dotenv').config();

const { PG_CONNECTION_STRING } = process.env;
const pg = require('knex')({
  client: 'pg',
  connection: PG_CONNECTION_STRING,
});

const select = async (table, args, offset, limit) =>
  args
    ? pg(table)
        .where(args)
        .offset(offset || 0)
        .limit(limit || null)
    : pg(table)
        .offset(offset || 0)
        .limit(limit || null);

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
  orderBy
    ? pg
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
        .limit(limit || null)
        .orderBy(orderBy, orderDir)
    : pg
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
        .limit(limit || null);

const insert = (table, args) => pg(table).insert(args).returning('*');

const update = (table, args, id) =>
  pg(table).update(args).where('id', '=', id).returning('*');

const count = (table, column) => pg(table).count(column).first();

module.exports = { select, insert, update, selectWithJoin, count };
