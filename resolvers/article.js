const uuid = require('uuid');
const Article = require('../database/models/article');

module.exports = {
    Query: {
        articles: async () => {
            let articles = await Article.find().sort({date: 'desc'});
            return articles;
        },
        article: async (_, args) => {
            let article = await Article.findById(args.id);
            return article;
        },
        searchArticles: async (_, args) => {
            let article = await Article.find({ $title: { $search: args.search} });
            return article;
        }
    },
    Article: {
    },
}
