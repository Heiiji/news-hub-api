const { users, threads } = require('../constants')

module.exports = {
    Query: {
        users: () => users,
        user: (_, { id }) => users.find(user => user.id === id)
    },
    Mutation: {
    },
    User: {
        subscriptions: ({ subscriptionsId }) => {
            return subscriptionsId.map(id => threads.find(thread => thread.id === id))
        }
    }
}