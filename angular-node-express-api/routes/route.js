const express = require('express');
const router = express.Router();
const yelp = require('../controllers/yelp');
const reviewScrape = require('../scrapeReviews');
var path = require('path');
var exports = module.exports = {};

const allowed = [
  '.js',
  '.css',
  '.png',
  '.jpg'
];

// server side
router.get('*', function(req, res) {
  console.log(path.dirname(require.main.filename))
console.log(path.join(__dirname, '/dist/index.html'));
console.log(path.join(__dirname, '../..//dist/index.html'));
console.log(path.join(__dirname, '../dist/index.html'));
//introduce error handling for
// if (allowed.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
//   res.sendFile(path.resolve(`client/dist/${req.url}`));
// } else {
//   res.sendFile(path.join(__dirname, 'client/dist/client/index.html'));
// }
res.sendFile(path.join(__dirname, '../../dist/yelpers/index.html'));
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
