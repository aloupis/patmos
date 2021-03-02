const transformEntity = (data, mainEntity, relatedEntity, relationField) => {
  const mainEntityKeys = Object.keys(data).filter(
    (key) => mainEntity === key.split('.').shift()
  );
  const relatedEntityKeys = Object.keys(data).filter(
    (key) => relatedEntity === key.split('.').shift()
  );

  return {
    ...[
      ...mainEntityKeys.map((key) => ({
        [`${key.split('.').pop()}`]: data[`${key}`],
      })),
    ].reduce((a, b) => ({ ...a, ...b }), {}),
    [`${relationField}`]: {
      ...[
        ...relatedEntityKeys.map((key) => ({
          [`${key.split('.').pop()}`]: data[`${key}`],
        })),
      ].reduce((a, b) => ({ ...a, ...b }), {}),
    },
  };
};

module.exports = { transformEntity };
