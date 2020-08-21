const mongoose = require('mongoose');


const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    language: {
        type: String,
        required: false
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
    httpStatus: {
        type: String,
        required: false
    },
    private: {
        type: Boolean,
        required: false,
        default: false
    },
    subscribers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
}, {
    timestamp: true
});

module.exports = mongoose.model('Subscription', subscriptionSchema);