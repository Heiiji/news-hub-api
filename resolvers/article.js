const uuid = require('uuid');

module.exports = {
    Query: {
        articles: () => threads,
        article: (_, args) => threads.find(thread => thread.id === args.id)
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