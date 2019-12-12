const express = require('express');
const router = express.Router();
const yelp = require('../controllers/yelp');
const reviewScrape = require('../scrapeReviews');
var exports = module.exports = {};

// server side
router.get('/', function() {
console.log("test");
});

router.post('/api/search', function (req, res) {
  yelp.getRestaurants(req, res);
});

router.post('/api/random-nearby', function(req, res) {
  yelp.getRandNearby(req, res);
});

router.post('/api/single', function( req, res) {
  yelp.getSingle(req, res);
});

router.post('/api/single-category', function( req, res) {
  yelp.getSingleCategory(req, res);
});

router.post('/api/reviews', function( req, res) {

  reviewScrape.scrapeReviews(req, res)
  // yelp.getReviews(req, res);

});


module.exports = router;
