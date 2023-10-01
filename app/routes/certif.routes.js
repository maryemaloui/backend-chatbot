module.exports = (app) => {
    const certifs = require('../controllers/certif.controller.js');


    app.post('/certifs', certifs.create);

    
    app.get('/certifs', certifs.findAll);

   
    app.get('/certifs/:certifId', certifs.findOne);

    
    app.put('/certifs/:certifId', certifs.update);

    
    app.delete('/certifs/:certifId', certifs.delete);
}
