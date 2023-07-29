const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
require("dotenv").config();

const home = require('./routes/home');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', home);

app.listen( port, function(){
  console.log('Express listening on port', port);
});