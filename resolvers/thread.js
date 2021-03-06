const Thread = require('../database/models/thread');
let Parser = require('rss-parser');
const urlMetadata = require('url-metadata');

let parser = new Parser();

module.exports = {
    Query: {
        threads: async () => {
            let threads = await Thread.find();
            return threads;
        },
        thread: async (_, args) => {
            let thread = await Thread.findById(args.id);
            return thread;
        }
    },
    Mutation: {
        createThread: async (_, { url }) => {
            console.log("check ", url);
            let feed = await parser.parseURL(url);
            let thread = await Thread.findOne({ url: url });
            if (thread) {
                console.log("already exist", thread)
                return null;
            }
            let regex = /^https?:\/\/[^\/]+/i;

            const metadata = await urlMetadata(url);
            console.log(metadata.image);
            
            thread = new Thread({
                name: feed.title,
                description: feed.description,
                language: feed.language,
                image: metadata.image ? metadata.image : feed.image ? feed.image.url : null,
                domain: regex.exec(url)[0],
                url: url,
                status: '200'
            });
            let newOne = await thread.save();
            console.log("newOne", newOne)
            return newOne;
        }
    },
    Thread: {
        subscribers: ({subscribersId}) => {
            return subscribersId.map(id => users.find(user => user.id === id))
        }
    },
}