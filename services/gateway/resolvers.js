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
    insert_post: async (_, { title, content }, { token }) => {
      const userId = authenticate(token);
      const [user] = await db.select("usr", { id: userId });

      const [post] = await db.insert("post", {
        title,
        content,
        author_id: user.id,
        created_at: new Date(),
      });
      return post;
    },
  },
};

module.exports = { resolvers };
