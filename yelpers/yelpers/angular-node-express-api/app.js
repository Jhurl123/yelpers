var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var users = require('./routes/users');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.listen(3000, function (){
  console.log('Server listening on port 3000');
});

// server side
app.get('/api', function (req, res) {
  console.log("Route Called");
  users.getRestaurants();
});

module.exports = app;
