const { authenticate } = require('./auth');
const db = require('./db');
const { postColumns, usrColumns } = require('./model');
const { transformEntity } = require('./utils');

const resolvers = {
  Query: {
    posts: async (_, args) => {
      try {
        const posts = await db.selectWithJoin(
          'post',
          postColumns,
          'author_id',
          'usr',
          usrColumns
        );
        return posts.map((post) =>
          transformEntity(post, 'post', 'usr', 'author')
        );
      } catch (err) {
        console.log({ err });
        throw err;
      }
    },
  },
  Mutation: {
    insert_post: async (
      _,
      { title_gr, title_en, content_gr, content_en },
      { token }
    ) => {
      console.log({ token });
      const userId = authenticate(token);
      console.log({ token, userId });
      const [user] = await db.select('usr', { id: +userId });
      console.log({ content_en });
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
  },
};

module.exports = { resolvers };
