const transformEntity = (data, mainEntity, relatedEntities) => {
  const mainEntityKeys = Object.keys(data).filter(
    (key) => mainEntity === key.split('.').shift()
  );
  const relatedEntityKeys = relatedEntities.map((relatedEntity) => ({
    field: relatedEntity.field,
    keys: Object.keys(data).filter(
      (key) => relatedEntity.table === key.split('.').shift()
    ),
  }));

  return {
    ...[
      ...mainEntityKeys.map((key) => ({
        [`${key.split('.').pop()}`]: data[`${key}`],
      })),
      ...relatedEntityKeys.map((entity) => ({
        [`${entity.field}`]: {
          ...[
            ...entity.keys.map((key) => ({
              [`${key.split('.').pop()}`]: data[`${key}`],
            })),
          ].reduce((a, b) => ({ ...a, ...b }), {}),
        },
      })),
    ].reduce((a, b) => ({ ...a, ...b }), {}),
  };
};

module.exports = { transformEntity };
