const bcrypt = require('bcryptjs');

const { users, threads } = require('../constants');
const User = require('../database/models/user');

module.exports = {
    Query: {
        users: () => users,
        user: (_, { id }) => users.find(user => user.id === id)
    },
    Mutation: {
        signup: async (_, { input }) => {
            try {
                const user = await User.findOne({ email: input.email });
                if (user) {
                    throw new Error('Email already exist');
                }
                const hashedPassword = await bcrypt.hash(input.password, 12);
                const newUser = new User({...input, password: hashedPassword });
                const result = await newUser.save();
                return result;
            } catch (err) {
                console.log(err);
                throw err;
            }
        }
    },
    User: {
        subscriptions: ({ subscriptionsId }) => {
            return subscriptionsId.map(id => threads.find(thread => thread.id === id))
        }
    }
}