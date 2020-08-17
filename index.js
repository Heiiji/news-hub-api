const { ApolloServer } = require('apollo-server');

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

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(80).then(({url}) => {
    console.log("l'api tourne sur ", url);
});