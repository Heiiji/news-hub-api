const Thread = require('../database/models/thread');
let Parser = require('rss-parser');

let parser = new Parser();

const getThreadData = async (thread) => {
    if (!thread) {
        throw "invalid args";
    }
    let feed = await parser.parseURL(thread.url);
    console.log(Object.keys(feed.items[0]));
    console.log(thread.refreshAt); // 2020-09-02T12:56:00.012Z
    console.log(Date.now()); // 1599051360702
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