const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { combineResolvers } = require('graphql-resolvers');

const { users, threads } = require('../constants');
const User = require('../database/models/user');
const { isAuthenticated } = require('./middleware');

module.exports = {
    Query: {
        user: combineResolvers(isAuthenticated, async (_, __, { email }) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error('User not found!');
                }
                return user;
            } catch(err) {
                console.log(err);
                throw(err);
            }
        })
    },
    Mutation: {
        changePassword: combineResolvers(isAuthenticated, async (_, { input }, { email }) => {
            try {
                const user = await User.findOne({ email });
                if (!user) {
                    throw new Error('User not found!');
                }

                const isPasswordValid = await bcrypt.compare(input.oldPassword, user.password);
                if (!isPasswordValid) {
                    throw new Error('Invalid password');
                }

                user.password = await bcrypt.hash(input.password, 12);
                const result = await user.save();

                return result;
            } catch(err) {
                console.log(err);
                throw(err);
            }
        }),
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
        },
        login: async (_, { input }) => {
            try {
                const user = await User.findOne({ email: input.email });
                if (!user) {
                    throw new Error('User not found');
                }
                const isPasswordValid = await bcrypt.compare(input.password, user.password);
                if (!isPasswordValid) {
                    throw new Error('Invalid password');
                }
                const secret = process.env.JWT_SECRET_KEY || 'mySecretKey';
                const token = jwt.sign({email: user.email}, secret, {expiresIn: '1d'});
                return {token};
            } catch (e) {
                console.log(e);
                throw e;
            }
        }
    },
    User: {
        subscriptions: ({ subscriptionsId }) => {
            return subscriptionsId.map(id => threads.find(thread => thread.id === id))
        }
    }
}