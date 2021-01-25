const { AuthenticationError } = require("apollo-server");

const resolvers = {
  Query: {
    //   hello: async () => {
    //     const test = await pg("usr");
    //     console.log(JSON.stringify(test));
    //     return "hello";
    //   },

    posts: async (_, args, { auth }) => {
      const { isAuthenticated } = auth;
      console.log({ isAuthenticated });
      if (!isAuthenticated) {
        throw new AuthenticationError("Not logged in!");
      }
      return "";
    },
  },
  // Mutation:{},
};

module.exports = { resolvers };
