const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');

const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');

// set env var

dotEnv.config();

const app = express();

// cors
app.use(cors());

// body parser middleware

app.use(express.json());

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

apolloServer.applyMiddleware({app, path: "/graphql"});

const PORT = process.env.PORT || 3000;

app.use("/", (req, res, next) => {
    res.send("Hello World");
})

app.listen(PORT, () => {
    console.log(`server listen on PORT : ${PORT}`);
    console.log(`graphql endpoint  : ${apolloServer.graphqlPath}`);
})