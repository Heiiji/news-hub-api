const { gql } = require('apollo-server-express');

module.exports = gql`
    extend type Query {
        sources: [Source!]
        source(id: ID!): Source
    }
    
    input createSourceInput {
        url: String!
    }
    
    extend type Mutation {
        createSource(url: String!): Source
    }
    
    type Source {
        id: ID!
        name: String!
        description: String
        language: String
        image: String
        domain: String
        url: String!
        status: String,
        tags: [String!],
        private: Boolean
    }
`;
