const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');

const { users, threads } = require('./constants')

// set env var

dotEnv.config();

const app = express();

// cors
app.use(cors());

// body parser middleware

app.use(express.json());

const typeDefs = gql`
    type Query {
        greetings: [String!]
        threads: [Thread!]
        thread(id: ID!): Thread
    }
    
    type User {
        id: ID!
        name: String!
        email: String!
        subscriptions: [Thread!]
    }
    
    type Thread {
        id: ID!
        name: String!
        description: String
        language: String
        image: String
        domain: String
        url: String!
        httpStatus: Int,
        tags: [String!],
        subscribers: [User!],
        private: Boolean
    }
`;

const resolvers = {
    Query: {
        greetings: () => null,
        threads: () => threads,
        thread: (_, args) => threads.find(thread => thread.id === args.id)
    },
    Thread: {
        subscribers: ({subscribersId}) => {
            return subscribersId.map(id => users.find(user => user.id === id))
        }
    }
};

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