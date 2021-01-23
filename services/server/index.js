const { ApolloServer, gql } = require("apollo-server");
const pg = require("knex")({
  client: "pg",
  connection: "postgres://postgres:123456@localhost:5432/postgres",
});

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: async () => {
      const test = await pg("usr");
      console.log(JSON.stringify(test));
      return "hello";
    },
  },
  // Mutation:{},
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen({ host: "localhost", port: 7000 }).then(({ url }) => {
  console.log(`Gateway service ready at ${url}`);
});
