import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import { resolvers } from "./src/resolvers";
import { typeDefs } from "./src/schemas"
require('dotenv').config();


const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
})
const login = process.env.MONGO_LOGIN
const password = process.env.MONGO_PASS
const start = async () => {
  const mongoUrl = `mongodb+srv://${login}:${password}@cluster0.juvowew.mongodb.net/?retryWrites=true&w=majority`;
  let db = mongoose.connection;
  db.on('error', () => {
      console.error("Error while connecting to DB");
  });
  await mongoose.connect(mongoUrl)
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

start()