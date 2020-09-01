const uuid = require('uuid');
const Article = require('../database/models/article');

module.exports = {
    Query: {
        articles: () => {
            return Article.find();
        },
        article: (_, args) => {
            return Article.findById(args.id);
        }
    },
    Article: {
        subscribers: ({subscribersId}) => {
            return subscribersId.map(id => users.find(user => user.id === id))
        }
    },
}