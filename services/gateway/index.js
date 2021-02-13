require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const db = require("./db");

const { SECRET_KEY, HOST, PORT } = process.env;

const corsOptions = {
  origin: "http://localhost:3000", //change with your own client URL
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const [user] = await db.select("usr", { email });
  if (!user) {
    res.status(404).send({
      success: false,
      message: `Could not find account: ${email}`,
    });
    return;
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    //return error to user to let them know the password is incorrect
    res.status(401).send({
      success: false,
      message: "Incorrect credentials",
    });
    return;
  }

  const token = jwt.sign({ email: user.email, id: user.id }, SECRET_KEY);
  const date = new Date();
  res.cookie("jwt", token, {
    httpOnly: true,
    expires: new Date(date.setTime(date.getTime() + 10 * 60 * 1000)),
    //secure: true, //on HTTPS
    domain: HOST,
  });

  res.send({
    success: true,
  });
});

const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

const context = ({ req }) => {
  const token = req.cookies["jwt"] || "";
  return { token };
};

const server = new ApolloServer({ typeDefs, resolvers, context, cors: false });
server.applyMiddleware({ app, cors: false });

app.listen(PORT, () =>
  console.log(`Gateway service ready at http://${HOST}:${PORT}/`)
);
