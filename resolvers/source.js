const Source = require('../database/models/source');
let Parser = require('rss-parser');
const urlMetadata = require('url-metadata');

let parser = new Parser();

module.exports = {
  Query: {
    sources: async () => {
      let sources = await Source.find();
      return sources;
    },
    source: async (_, args) => {
      let source = await Source.findById(args.id);
      return source;
    }
  },
  Mutation: {
    createSource: async (_, { url }) => {
      console.log("check ", url);
    }
  },
  Thread: {
  },
}
