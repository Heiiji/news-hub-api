const uuid = require('uuid');
const { users, threads } = require('../constants');

module.exports = {
    Query: {
        threads: () => threads,
        thread: (_, args) => threads.find(thread => thread.id === args.id)
    },
    Mutation: {
        createThread: (_, { input }) => {
            const thread = {...input, id: uuid.v4()};
            threads.push(thread);
            return thread;
        }
    },
    Thread: {
        subscribers: ({subscribersId}) => {
            return subscribersId.map(id => users.find(user => user.id === id))
        }
    },
}