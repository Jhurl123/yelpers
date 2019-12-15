var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const router = express.Router();
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

app.use(express.static(__dirname + 'dist/yelpers'));
// Allow node to read the .env file
dotenv.config();

// was listening on port 3000 before the change
var port = process.env.PORT || 8080;
app.listen(port, function (){
  console.log(`Server listening on port ${process.env.PORT}`);
});

// server side
app.get('*', function(req, res) {
  console.log(path.dirname(require.main.filename))
console.log(path.join(__dirname, '/dist/index.html'));
console.log(path.join(__dirname, '../..//dist/index.html'));
console.log(path.join(__dirname, '../dist/index.html'));
//introduce error handling for
res.sendFile(path.join(__dirname, '../../../dist/yelpers/index.html'));
});
//app.use( routes);
module.exports = app;
