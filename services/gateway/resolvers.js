const { authenticate } = require('./auth');
const db = require('./db');
const { postColumns, usrColumns } = require('./model');
const { transformEntity } = require('./utils');

const resolvers = {
  Query: {
    posts: async (_, { offset, limit, orderBy }) => {
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
    },
    posts_count: async (_, args) => {
      const total = await db.count('post', 'id');
      return total ? total.count : 0;
    },

    post_by_pk: async (_, { id }) => {
      const [post] = await db.selectWithJoin(
        'post',
        postColumns,
        'author_id',
        'usr',
        usrColumns,
        { 'post.id': id }
      );

      return transformEntity(post, 'post', 'usr', 'author');
    },
  },
  Mutation: {
    insert_post: async (_, { input }, { token }) => {
      // eslint-disable-next-line camelcase
      const { title_gr, title_en, content_gr, content_en } = input;
      const userId = authenticate(token);
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
    },
    update_post: async (_, { set, id }, { token }) => {
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
    },
  },
};

module.exports = { resolvers };
