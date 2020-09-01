const mongoose = require('mongoose');


const threadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    domain: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false,
        default: "200"
    },
    tags: [
        {
            type: String
        }
    ],
    private: {
        type: Boolean,
        default: true
    }
}, {
    timestamp: true
});

module.exports = mongoose.model('Thread', threadSchema);