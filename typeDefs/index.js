const { gql } = require('apollo-server-express');

const userTypeDefs = require('./user');
const threadTypeDefs = require('./thread');

const typeDefs = gql`
    scalar Date
    
    type Query {
        _: String
    }
    
    type Mutation {
        _: String
    }
`;

module.exports = [
    typeDefs,
    userTypeDefs,
    threadTypeDefs
]