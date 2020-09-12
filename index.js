const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');
const cron = require('node-cron');
const routine = require('./utils/routine');

const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const { connection } = require('./database/util');
const { verifyUser } = require('./helper/context');

// set env var

dotEnv.config();

const app = express();

// DB connection

connection();

// cors
app.use(cors());

// body parser middleware

app.use(express.json());

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        await verifyUser(req);
        return {
            email: req.email
        }
    }
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


// routine

cron.schedule("* 1 * * *", function() {
    console.log("Routine start");
    routine();
  });