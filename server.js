const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config()

// create express app
const app = express();
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

const PORT = 3000;
const HOST = '0.0.0.0';

mongoose.Promise = global.Promise;

// Connecting to the database
/**mongoose.connect(dbConfig.url, {
	useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});*/

   

    mongoose
    .connect(
        "mongodb://mongodb-service:27017/backend",
        { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
      )
      .then((db) => {
        console.log("Database connected");
      })
      .catch((error) => console.log("Could not connect to MongoDB " + error));
// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Rest API By LinSoft."});
});

require('./app/routes/admin.routes.js')(app);
require('./app/routes/chat.routes.js')(app);
require('./app/routes/certif.routes.js')(app);

// listen for requests
app.listen(PORT,   () => {
    console.log("Server is listening on port: " + `http://${HOST}:${PORT}`);
});