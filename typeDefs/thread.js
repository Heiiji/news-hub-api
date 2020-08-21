const { gql } = require('apollo-server-express');

module.exports = gql`
    extend type Query {
        threads: [Thread!]
        thread(id: ID!): Thread
    }
    
    input createThreadInput {
        name: String,
        description: String,
        language: String,
        url: String!
    }
    
    extend type Mutation {
        createThread(input: createThreadInput!): Thread
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