const memberColumns = [
  'id',
  'name_gr',
  'name_en',
  'description_gr',
  'description_en',
  'image_public_id',
  'summary_gr',
  'summary_en',
  'position_gr',
  'position_en',
  'created_at',
  'updated_at',
];

const usrColumns = ['id', 'username', 'email'];

const memberRelations = [{ table: 'usr', field: 'author' }];

const memberJoins = [
  { table: 'usr', columns: usrColumns, foreignKey: 'author_id' },
];

module.exports = {
  memberColumns,
  usrColumns,
  memberRelations,
  memberJoins,
};
