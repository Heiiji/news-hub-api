const { GraphQLDateTime } = require('graphql-iso-date');

const userResolver = require('./user');
const threadResolver = require('./thread');

const customDateScalarResolver = {
    Date: GraphQLDateTime
}

module.exports = [
    userResolver,
    threadResolver,
    customDateScalarResolver
]