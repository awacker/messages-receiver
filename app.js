const express     = require("express");           // call express
const router      = express.Router();
const bodyParser  = require("body-parser");
const app         = express();                    // define our app using express
const config      = require('config');
const Receiver    = require('./receiver');

// ================================================================================= RECEIVER CONFIG
const receiver = new Receiver(config.db);

// =================================================================================== SERVER CONFIG
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ================================================================================== ROUTES SETTING

app.post('/api/echo-at-time', (req, res) => {

  if (!req.body.message instanceof String || !Number.isSafeInteger(req.body.delay)) {
    return res.status(400).send("Bad request!");
  }

  receiver.echoAtTime(req.body.message, req.body.delay)
  res.end();

});

app.use(express.static('public'));
app.use((req, res, next) => res.status(404).send('Sorry, page not found!'));

// ==================================================================================== SERVER START
var server = app.listen(config.server.port, function () {
    console.log("App running on port.", server.address().port);
});

module.exports = app;
