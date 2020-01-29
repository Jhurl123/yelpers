var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const routes = require('./api/route');
const yelpRouter = require('./api/yelp-routes');
const userRouter = require('./api/user-routes');
const reviewRouter = require('./api/review-routes');
const dotenv = require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Reenable when pushing to Heroku
app.use(express.static(path.join(__dirname, '../dist')));

// was listening on port 3000 before the change\
//Change port back to port
console.log(process.env.PORT + " is the port I'm listening on lol")
var port = process.env.PORT || 8080;
app.listen(port, function (){
  console.log(`Server listening on port ${process.env.PORT}`);
});

app.use('/api/yelp', yelpRouter );
app.use('/api/user', userRouter);
app.use('/api/reviews', reviewRouter);
app.use( routes);

module.exports = app;
