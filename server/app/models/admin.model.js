const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    prenom: {
            type: String,
          
           
    },
    nom: {
        type: String,
       
       
},
    email: {
            type: String,
            unique: [true, 'The email is unique']
           
    },
    password: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Admin', AdminSchema);