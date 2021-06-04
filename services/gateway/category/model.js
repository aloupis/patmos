const categoryColumns = [
  'id',
  'name_gr',
  'name_en',
  'description_gr',
  'description_en',
  'created_at',
  'updated_at',
];

const usrColumns = ['id', 'username', 'email'];

const categoryRelations = [{ table: 'usr', field: 'author' }];

const categoryJoins = [
  { table: 'usr', columns: usrColumns, foreignKey: 'author_id' },
];

module.exports = {
  categoryColumns,
  usrColumns,
  categoryRelations,
  categoryJoins,
};
