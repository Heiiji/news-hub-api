const urlMetadata = require('url-metadata');
const Thread = require('../database/models/thread');
const Article = require('../database/models/article');
let Parser = require('rss-parser');

let parser = new Parser();

const getArticleData = async (article, thread) => {
  let tags = [...thread.tags];
  if (new Date(thread.refreshAt) > new Date(article.isoDate)) {
    return;
  }
  if (article.categories) {
    tags = tags.concat(article.categories);
  }
    urlMetadata(article.link).then(
    function (metadata) {
      let newArticle = new Article({
        title: article.title ? article.title : metadata.title,
        description: article.contentSnippet ? article.contentSnippet : metadata.description,
        threadId: thread._id,
        tags: tags,
        url: article.link,
        author: article.creator,
        content: article.content,
        image: metadata.image,
        date: article.isoDate
      });
      newArticle.save();
    },
    function (error) { // failure handler
      console.log(error);
      let newArticle = new Article({
        title: article.title,
        description: article.contentSnippet,
        threadId: thread._id,
        tags: tags,
        url: article.link,
        author: article.creator,
        content: article.content,
        image: thread.image,
        date: article.isoDate
      });
      newArticle.save();
    })
}

const getThreadData = async (thread) => {
    if (!thread) {
        throw "invalid args";
    }
    let feed = await parser.parseURL(thread.url);
    feed.items.forEach((article) => getArticleData(article, thread));
    thread.refreshAt = new Date();
    thread.save();
  }

/*

'items',
  'feedUrl',
  'image',
  'title',
  'description',
  'generator',
  'link',
  'language',
  'lastBuildDate'


ITEM
  'creator',
  'title',
  'link',
  'pubDate',
  'content:encoded',
  'content:encodedSnippet',
  'dc:creator',
  'content',
  'contentSnippet',
  'guid',
  'categories',
  'isoDate'

*/


module.exports = async function() {
    console.log("go");
    let threads = await Thread.find({ status: "200" });
    console.log("Thread numbers", threads.length);
    threads.forEach(getThreadData);
}