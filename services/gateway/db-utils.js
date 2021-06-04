const withOrderBy = async (args, orderBy, orderDir) =>
  orderBy ? args.orderBy(orderBy, orderDir || 'desc') : args;

const constructSelectWithJoins = (table, tableColumns, joins) => [
  ...tableColumns.map((col) => `${table}.${col} as ${table}.${col} `),
  ...joins.flatMap((join) =>
    join.columns.reduce(
      (joinedTablesSelect, column) => [
        ...joinedTablesSelect,
        `${join.table}.${column} as ${join.table}.${column}`,
      ],
      []
    )
  ),
];

const applyJoinsToQuery = (query, joins) =>
  joins.reduce(
    (queryWithJoins, join) =>
      queryWithJoins.innerJoin(join.table, join.foreignKey, `${join.table}.id`),
    query
  );

module.exports = {
  withOrderBy,
  constructSelectWithJoins,
  applyJoinsToQuery,
};
