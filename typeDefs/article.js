const { gql } = require('apollo-server-express');

module.exports = gql`
    extend type Query {
        articles: [Article!]
        article(id: ID!): Article
    }
    
    type Article {
        id: ID!
        title: String!
        description: String
        thread: Thread
        tags: [String!]
        url: String!
        author: String
        content: String
        image: String
    }
`;