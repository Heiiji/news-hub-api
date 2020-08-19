const { ApolloServer } = require('apollo-server');

const config = require("./config");

const port = process.env.PORT || config.port;
const ENV = process.env.NODE_ENV || config.env;

const typeDefs = `
    type Query {
        hello: String!
    }
`;

const resolvers = {
    Query: {
        hello: () => "Hello!"
    }
}

const app = new ApolloServer({
    typeDefs,
    resolvers
})

app.set( "env", ENV );

require( "./config/mongoose" )( app );

app.listen(port).then(({url}) => {
    console.log("l'api tourne sur ", url);
});