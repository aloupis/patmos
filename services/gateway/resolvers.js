const { authenticate } = require('./auth');
const db = require('./db');
const { postColumns, usrColumns } = require('./model');
const { transformEntity } = require('./utils');
const { Sentry } = require('./sentry');

const resolvers = {
  Query: {
    posts: async (_, { offset, limit, orderBy }) => {
      try {
        const posts = await db.selectWithJoin(
          'post',
          postColumns,
          'author_id',
          'usr',
          usrColumns,
          null,
          offset,
          limit,
          orderBy && orderBy.field ? orderBy.field : 'post.id',
          orderBy && orderBy.direction ? orderBy.direction : 'desc'
        );
        return posts.map((post) =>
          transformEntity(post, 'post', 'usr', 'author')
        );
      } catch (err) {
        Sentry.captureException(err);
        return null;
      }
    },
    posts_count: async (_, args) => {
      try {
        const total = await db.count('post', 'id');
        return total ? total.count : 0;
      } catch (err) {
        Sentry.captureException(err);
        return null;
      }
    },
    post_by_pk: async (_, { id }) => {
      try {
        const [post] = await db.selectWithJoin(
          'post',
          postColumns,
          'author_id',
          'usr',
          usrColumns,
          { 'post.id': id }
        );

        return transformEntity(post, 'post', 'usr', 'author');
      } catch (err) {
        Sentry.captureException(err);
        return null;
      }
    },
  },
  Mutation: {
    insert_post: async (_, { input }, { token }) => {
      try {
        // eslint-disable-next-line camelcase
        const { title_gr, title_en, content_gr, content_en } = input;
        // const userId = authenticate(token);
        const userId = 1;

        const [user] = await db.select('usr', { id: +userId });

        const [insertedPost] = await db.insert('post', {
          title_gr,
          title_en,
          content_gr,
          content_en,
          author_id: user.id,
          created_at: new Date(),
        });

        const [post] = await db.selectWithJoin(
          'post',
          postColumns,
          'author_id',
          'usr',
          usrColumns,
          { 'post.id': insertedPost.id }
        );
        return transformEntity(post, 'post', 'usr', 'author');
      } catch (err) {
        Sentry.captureException(err);
        return null;
      }
    },
    update_post: async (_, { set, id }, { token }) => {
      try {
        const userId = authenticate(token);
        const [user] = await db.select('usr', { id: +userId });

        await db.update(
          'post',
          {
            ...set,
            editor_id: user.id,
            updated_at: new Date(),
          },
          id
        );

        const [post] = await db.selectWithJoin(
          'post',
          postColumns,
          'author_id',
          'usr',
          usrColumns,
          { 'post.id': id }
        );
        return transformEntity(post, 'post', 'usr', 'author');
      } catch (err) {
        Sentry.captureException(err);
        return null;
      }
    },
    delete_post: async (_, { id }, { token }) => {
      try {
        authenticate(token);
        await db.deleteRecords('post', { id });
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

module.exports = { resolvers };
