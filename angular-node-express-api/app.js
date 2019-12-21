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

// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}
// Instruct the app
// to use the forceSSL
// middleware
// app.use(forceSSL());

// Reenable when pushing to Heroku
// app.use(express.static(path.join(__dirname, '../dist')));

// Allow node to read the .env file
dotenv.config();
// was listening on port 3000 before the change\
//Change port back to port
var port = process.env.PORT || 8080;
app.listen(3000, function (){
  console.log(`Server listening on port ${process.env.PORT}`);
});


app.use( routes);
module.exports = app;
