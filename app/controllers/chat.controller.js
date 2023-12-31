const Chat = require('../models/chat.model.js');

// Create and Save a new chat
exports.create = (req, res) => {
    // Validate request
    if(!req.body.reponse) {
        return res.status(400).send({
            message: "chat content can not be empty"
        });
    }

    // Create a chat
    const chat = new Chat({
        question: req.body.question || "Untitled Chat",
        reponse: req.body.reponse,
       
    });

    // Save Chat in the database
    chat.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the chat."
        });
    });
};

// Retrieve and return all chat from the database.
exports.findAll = (req, res) => {
    Chat.find()
    .then(chats => {
        res.send(chats);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving chats."
        });
    });
};

// Find a single chat with a chatId
exports.findOne = (req, res) => {
    Chat.findById(req.params.chatId)
    .then(chat => {
        if(!chat) {
            return res.status(404).send({
                message: "chat not found with id " + req.params.chatId
            });            
        }
        res.send(chat);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "chat not found with id " + req.params.chatId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving chat with id " + req.params.chatId
        });
    });
};

// Update a chat identified by the chatId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.reponse) {
        return res.status(400).send({
            message: "chat content can not be empty"
        });
    }

    // Find chat and update it with the request body
    Chat.findByIdAndUpdate(req.params.chatId, {
        question: req.body.question || "Untitled chat",
        reponse: req.body.reponse,
        email : req.body.email,
        password: req.body.password
    }, {new: true})
    .then(chat => {
        if(!chat) {
            return res.status(404).send({
                message: "chat not found with id " + req.params.chatId
            });
        }
        res.send(chat);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "chat not found with id " + req.params.chatId
            });                
        }
        return res.status(500).send({
            message: "Error updating chat with id " + req.params.chatId
        });
    });
};

// Delete a chat with the specified chatId in the request
exports.delete = (req, res) => {
    Chat.findByIdAndRemove(req.params.chatId)
    .then(chat => {
        if(!chat) {
            return res.status(404).send({
                message: "chat not found with id " + req.params.chatId
            });
        }
        res.send({message: "chat deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "chat not found with id " + req.params.chatId
            });                
        }
        return res.status(500).send({
            message: "Could not delete chat with id " + req.params.chatId
        });
    });
};
