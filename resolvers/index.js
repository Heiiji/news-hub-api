const userResolver = require('./user');
const threadResolver = require('./thread');

module.exports = [
    userResolver,
    threadResolver
]