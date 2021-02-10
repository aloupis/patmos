const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { SECRET_KEY, PG_CONNECTION_STRING } = process.env;

const pg = require("knex")({
  client: "pg",
  connection: PG_CONNECTION_STRING,
});

const resolvers = {
  Query: {
    hello: async (_, args, { token }) => {
      if (!token) {
        throw new AuthenticationError(
          "Authentication token is invalid, please log in"
        );
      }
      try {
        const { id, email } = jwt.verify(token, SECRET_KEY);
      } catch (e) {
        throw new AuthenticationError(
          "Authentication token is invalid, please log in"
        );
      }

      return "hello";
    },
  },
};

module.exports = { resolvers };
