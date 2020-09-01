const { gql } = require('apollo-server-express');

module.exports = gql`
    extend type Query {
        threads: [Thread!]
        thread(id: ID!): Thread
    }
    
    input createThreadInput {
        url: String!
    }
    
    extend type Mutation {
        createThread(url: String!): Thread
    }
    
    type Thread {
        id: ID!
        name: String!
        description: String
        language: String
        image: String
        domain: String
        url: String!
        status: String,
        tags: [String!],
        subscribers: [User!],
        private: Boolean
    }
`;