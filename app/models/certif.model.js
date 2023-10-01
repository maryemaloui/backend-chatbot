const mongoose = require('mongoose');

const CertifSchema = mongoose.Schema({
    reference: {
            type: String,
            unique: [true, 'The reference is unique']
           
    },
    certif: {
        type: String,
    
    },
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Certif', CertifSchema);