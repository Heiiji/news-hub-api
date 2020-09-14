const { gql } = require('apollo-server-express');

module.exports = gql`
    extend type Query {
        user: User
    }
    
    extend type Mutation {
        signup(input: signupInput): User
        login(input: loginInput): Token
        changePassword(input: changePasswordInput): User
    }
    
    type Token {
        token: String!
    }
    
    input changePasswordInput {
        oldPassword: String!
        password: String!
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