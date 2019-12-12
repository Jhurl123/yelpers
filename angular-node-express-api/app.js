var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const routes = require('./routes/route');
var yelp = require('./controllers/yelp');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

console.log(process.env.PORT);
app.listen(process.env.PORT, function (){
  console.log('Server listening on port 3000');
});

app.use( routes);
module.exports = app;
