const { gql } = require('apollo-server-express');

const userTypeDefs = require('./user');
const threadTypeDefs = require('./thread');
const sourceTypeDefs = require('./source');
const articleTypeDefs = require('./article');

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
    threadTypeDefs,
    sourceTypeDefs,
    articleTypeDefs
]
