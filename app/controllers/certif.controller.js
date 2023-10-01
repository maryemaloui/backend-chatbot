const Certif = require('../models/certif.model.js');

// Create and Save a new certif
exports.create = (req, res) => {
    // Validate request
    if(!req.body.certif) {
        return res.status(400).send({
            message: "certif content can not be empty"
        });
    }

    // Create a certif
    const certif = new Certif({
        reference: req.body.reference || "Untitled Certif",
        certif: req.body.certif
    });

    // Save certif in the database
    certif.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the certif."
        });
    });
};

// Retrieve and return all certif from the database.
exports.findAll = (req, res) => {
    Certif.find()
    .then(certifs => {
        res.send(certifs);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving certifs."
        });
    });
};

// Find a single certif with a certifId
exports.findOne = (req, res) => {
    Certif.findById(req.params.certifId)
    .then(certif => {
        if(!certif) {
            return res.status(404).send({
                message: "certif not found with id " + req.params.certifId
            });            
        }
        res.send(certif);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "certif not found with id " + req.params.certifId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving certif with id " + req.params.certifId
        });
    });
};

// Update a certif identified by the certifId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.certif) {
        return res.status(400).send({
            message: "certif content can not be empty"
        });
    }

    // Find certif and update it with the request body
    Certif.findByIdAndUpdate(req.params.certifId, {
        reference: req.body.reference || "Untitled certif",
        certif: req.body.certif
    }, {new: true})
    .then(certif => {
        if(!certif) {
            return res.status(404).send({
                message: "certif not found with id " + req.params.certifId
            });
        }
        res.send(certif);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "certif not found with id " + req.params.certifId
            });                
        }
        return res.status(500).send({
            message: "Error updating certif with id " + req.params.certifId
        });
    });
};

// Delete a certif with the specified certifId in the request
exports.delete = (req, res) => {
    Certif.findByIdAndRemove(req.params.certifId)
    .then(certif => {
        if(!certif) {
            return res.status(404).send({
                message: "certif not found with id " + req.params.certifId
            });
        }
        res.send({message: "certif deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "certif not found with id " + req.params.certifId
            });                
        }
        return res.status(500).send({
            message: "Could not delete certif with id " + req.params.certifId
        });
    });
};
