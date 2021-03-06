const mongoose = require('mongoose');


const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    threadId: {
        type: String,
        required: true
    },
    tags: [
        {
            type: String
        }
    ],
    url: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamp: true
});

articleSchema.index({title: 'text', description: 'text'});

module.exports = mongoose.model('Article', articleSchema);
