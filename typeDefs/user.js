const { gql } = require('apollo-server-express');

module.exports = gql`
    extend type Query {
        users: [User!]
        user(id: ID!): User
    }
    
    extend type Mutation {
        signup(input: signupInput): User
        login(input: loginInput): Token
    }
    
    type Token {
        token: String!
    }
    
    input loginInput {
        email: String!
        password: String!
    }
    
    input signupInput {
        username: String!
        email: String!
        password: String!
    }
    
    type User {
        id: ID!
        username: String
        email: String!
        subscriptions: [Thread!]
        createdAt: Date!
        updatedAt: Date!
    }
`;