var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const routes = require('./api/route');
const yelpRouter = require('./api/yelp-routes');
const accountRouter = require('./api/account-routes');
const reviewRouter = require('./api/review-routes');
const dotenv = require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Reenable when pushing to Heroku
app.use(express.static(path.join(__dirname, '../dist')));

// was listening on port 3000 before the change\
//Change port back to port
var port = process.env.PORT || 8080;
app.listen(port, function (){
  console.log(`Server listening on port ${process.env.PORT}`);
});

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
app.use('/api/yelp', yelpRouter );
app.use('/api/account', accountRouter);
app.use('/api/reviews', reviewRouter);
app.use( routes);

module.exports = app;
