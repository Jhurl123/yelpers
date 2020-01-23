const request = require('request');
var exports = module.exports = {};

const headers = {
  'Authorization': 'Bearer 1TSelC6r6EeO4FBjtmYzL9SFeCrgZLSINT3Gxuhk4Ml5kLgtEJ-2FDsiBq6zmeNCdPYMvZjGjvSUiJvdQRs4b5xfdfq0XSiRHeI191na_bpNpvCHkIm3UZjuMhdWXXYx'
}
/* GET users listing. */
exports.getRestaurants = function( req, res ) {

  let terms = req.body.SearchTerms,
      location = req.body.Location;

    request.get({url:`https://api.yelp.com/v3/businesses/search?term=${terms}&location=${location}&limit=50`, headers: headers}, function(request, response, next) {
  }).pipe(res);
};

exports.getRandNearby = function( req, res ) {
  let longitude = req.body.longitude,
      latitude = req.body.latitude;

      request.get({url:`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}`, headers: headers}, function(request, response,next) {
      }).pipe(res);
}

exports.getSingle = function( req, res) {
  let id = req.body.id;

  request.get({url: `https://api.yelp.com/v3/businesses/${id}`, headers: headers}, function(request, response, next) {

  }).pipe(res);
}

// TODO  Alias should be a comma separated list?
exports.getSingleCategory = function( req, res) {
  let alias = req.body.alias;

  request.get({url: `https://api.yelp.com/v3/businesses/search?categorie=${alias}`, headers: headers}, function(request, response, next) {

  }).pipe(res);
}

exports.getReviews = function( req, res) {

  // console.dir(req.body);
  let id = req.body.id;

  console.log(req.body.url)

  request.get({url: `https://api.yelp.com/v3/businesses/${id}/reviews`, headers: headers}, function(request, response, next) {
    // console.dir(response)

  }).pipe(res);
}

module.exports = exports;
