const { ApolloServer } = require("apollo-server");
const { verifyToken } = require("./utils/verifyToken");
const pg = require("knex")({
  client: "pg",
  connection: "postgres://postgres:123456@localhost:5432/postgres",
});
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, ...rest }) => {
    let isAuthenticated = false;
    let user = null;
    try {
      const authHeader = req.headers.authorization || "";
      if (authHeader) {
        const token = authHeader.split(" ").pop();
        const payload = await verifyToken(token);
        isAuthenticated = payload && payload.sub ? true : false;
        //user= get user from db
      }
    } catch (error) {
      console.error(error);
    }
    return { ...rest, req, auth: { user, isAuthenticated } };
  },
});

server.listen({ host: "localhost", port: 7000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
