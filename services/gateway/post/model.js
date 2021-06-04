const postColumns = [
  'id',
  'title_gr',
  'title_en',
  'content_gr',
  'content_en',
  'created_at',
  'updated_at',
];

const usrColumns = ['id', 'username', 'email'];

const postRelations = [{ table: 'usr', field: 'author' }];

const postJoins = [
  { table: 'usr', columns: usrColumns, foreignKey: 'author_id' },
];

module.exports = { postColumns, usrColumns, postRelations, postJoins };
