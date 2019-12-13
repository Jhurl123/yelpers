var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const routes = require('./routes/route');
var yelp = require('./controllers/yelp');
const dotenv = require('dotenv');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(__dirname + '../dist/index.html'));
// Allow node to read the .env file
dotenv.config();

console.log(process.env.PORT);
app.listen(process.env.PORT, function (){
  console.log(`Server listening on port ${process.env.PORT}`);
});

app.use( routes);
module.exports = app;
