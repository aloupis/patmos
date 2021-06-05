const serviceColumns = [
  'id',
  'name_gr',
  'name_en',
  'content_gr',
  'content_en',
  'price',
  'category_id',
  'created_at',
  'updated_at',
];

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

const serviceRelations = [
  { table: 'usr', field: 'author' },
  { table: 'category', field: 'category' },
];

const serviceJoins = [
  { table: 'usr', columns: usrColumns, foreignKey: 'author_id' },
  { table: 'category', columns: categoryColumns, foreignKey: 'category_id' },
];

module.exports = {
  categoryColumns,
  serviceColumns,
  usrColumns,
  serviceRelations,
  serviceJoins,
};
