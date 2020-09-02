const uuid = require('uuid');
const Article = require('../database/models/article');

module.exports = {
    Query: {
        articles: async () => {
            let articles = await Article.find();
            return articles;
        },
        article: async (_, args) => {
            let article = await Article.findById(args.id);
            return article;
        }
    },
    Article: {
    },
}