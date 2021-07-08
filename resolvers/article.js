const uuid = require('uuid');
const Article = require('../database/models/article');

module.exports = {
    Query: {
        articles: async (_, args) => {
            let articles = await Article.find().sort({date: 'desc'}).limit(args.limit);
            return articles;
        },
        article: async (_, args) => {
            let article = await Article.findById(args.id);
            return article;
        },
        searchArticles: async (_, args) => {
            console.log("search");
            console.log(args);
            return Article.find({$text: {$search: args.search}});
        }
    },
    Article: {
    },
}
