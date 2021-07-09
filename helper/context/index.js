const ApolloServer = require('apollo-server-express')
const jwt = require('jsonwebtoken');

class TokenError extends ApolloServer.ApolloError {
    constructor(message) {
        super(message, '403');

        Object.defineProperty(this, 'name', { value: 'MyError' });
    }
}

module.exports.verifyUser = async (req) => {
    try {
        req.email = null;
        const bearerHeader = req.headers.authorization;
        if (bearerHeader) {
            const token = bearerHeader.split(' ')[1];
            const payload = jwt.verify(token, process.env.JWT_SECRET_KEY || 'mySecretKey');
            req.email = payload.email;
        }
    } catch(err) {
        console.log(err);
        throw new TokenError("invalid token");
    }
}
