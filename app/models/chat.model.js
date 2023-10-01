const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    question: {
            type: String,
    },
    reponse: {
        type: String,
},

}, {
    timestamps: true
});

module.exports = mongoose.model('Chat', ChatSchema);