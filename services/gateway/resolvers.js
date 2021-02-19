const { authenticate } = require("./auth");
const db = require("./db");

const resolvers = {
  Query: {
    posts: async (_, args) => {
      try {
        const posts = await db.select("post");
        return posts;
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
      // const userId = authenticate(token);
      // const [user] = await db.select("usr", { id: userId });

      const [post] = await db.insert("post", {
        title_gr,
        title_en,
        content_gr,
        content_en,
        author_id: 1, //user.id,
        created_at: new Date(),
      });
      console.log({ post });
      return post;
    },
  },
};

module.exports = { resolvers };
