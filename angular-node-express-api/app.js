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

// Reenable when pushing to Heroku
app.use(express.static(path.join(__dirname, '../dist')));

// Allow node to read the .env file
dotenv.config();
// was listening on port 3000 before the change\
//Change port back to port
var port = process.env.PORT || 8080;
app.listen(port, function (){
  console.log(`Server listening on port ${process.env.PORT}`);
});


app.use( routes);
module.exports = app;
