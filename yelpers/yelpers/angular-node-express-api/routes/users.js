var express = require('express');
var router = express.Router();
const request = require('request');

var exports = module.exports = {};

const headers = {
  'Authorization': 'Bearer 1TSelC6r6EeO4FBjtmYzL9SFeCrgZLSINT3Gxuhk4Ml5kLgtEJ-2FDsiBq6zmeNCdPYMvZjGjvSUiJvdQRs4b5xfdfq0XSiRHeI191na_bpNpvCHkIm3UZjuMhdWXXYx'
}
/* GET users listing. */
exports.getRestaurants = function() {
    request.get({url:'https://api.yelp.com/v3/businesses/', headers: headers}, function(req, res, next) {

  console.dir(res.body);
  //console.dir(res.body);
  });
};

module.exports = exports;
