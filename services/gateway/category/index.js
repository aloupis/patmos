const { authenticate } = require('../auth');
const db = require('../db');
const {
  categoryColumns,
  categoryRelations,
  categoryJoins,
} = require('./model');
const { transformEntity } = require('../utils');
const { Sentry } = require('../sentry');

const resolvers = {
  Query: {
    categories: async (_, { offset, limit, orderBy }) => {
      try {
        const categories = await db.selectWithJoin(
          'category',
          categoryColumns,
          categoryJoins,
          null,
          offset,
          limit,
          orderBy && orderBy.field ? orderBy.field : 'category.id',
          orderBy && orderBy.direction ? orderBy.direction : 'desc'
        );
        return categories.map((category) =>
          transformEntity(category, 'category', categoryRelations)
        );
      } catch (err) {
        Sentry.captureException(err);
        return null;
      }
    },
    categories_count: async (_, args) => {
      try {
        const total = await db.count('category', 'id');
        return total ? total.count : 0;
      } catch (err) {
        Sentry.captureException(err);
        return null;
      }
    },
    category_by_pk: async (_, { id }) => {
      try {
        const [category] = await db.selectWithJoin(
          'category',
          categoryColumns,
          categoryJoins,
          { 'category.id': id }
        );

        return transformEntity(category, 'category', categoryRelations);
      } catch (err) {
        Sentry.captureException(err);
        return null;
      }
    },
  },
  Mutation: {
    insert_category: async (_, { input }, { token }) => {
      try {
        // eslint-disable-next-line camelcase
        const {
          name_gr,
          name_en,
          description_gr,
          description_en,
          summary_gr,
          summary_en,
        } = input;
        const userId = authenticate(token);
        const [user] = await db.select('usr', { id: +userId });

        const [insertedCategory] = await db.insert('category', {
          name_gr,
          name_en,
          description_gr,
          description_en,
          summary_gr,
          summary_en,
          author_id: user.id,
          created_at: new Date(),
        });
        const [category] = await db.selectWithJoin(
          'category',
          categoryColumns,
          categoryJoins,
          { 'category.id': insertedCategory.id }
        );

        return transformEntity(category, 'category', categoryRelations);
      } catch (err) {
        console.log({ err });
        Sentry.captureException(err);
        return null;
      }
    },
    update_category: async (_, { set, id }, { token }) => {
      try {
        const userId = authenticate(token);
        const [user] = await db.select('usr', { id: +userId });

        await db.update(
          'category',
          {
            ...set,
            editor_id: user.id,
            updated_at: new Date(),
          },
          id
        );

        const [category] = await db.selectWithJoin(
          'category',
          categoryColumns,
          categoryJoins,
          { 'category.id': id }
        );
        return transformEntity(category, 'category', categoryRelations);
      } catch (err) {
        Sentry.captureException(err);
        return null;
      }
    },
    delete_category: async (_, { id }, { token }) => {
      try {
        authenticate(token);
        await db.deleteRecords('category', { id });
        return {
          success: true,
        };
      } catch (err) {
        Sentry.captureException(err);
        return {
          success: false,
          message: err,
        };
      }
    },
  },
};

module.exports = resolvers;
