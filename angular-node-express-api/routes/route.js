const express = require('express');
const router = express.Router();
const yelp = require('../controllers/yelp');
const reviewScrape = require('../scrapeReviews');
var path = require('path');
var userDB = require('../database/users-db');
var exports = module.exports = {};

// server side
// server side
router.get('*', (req, res) => {

  //introduce error handling for
  res.sendFile(path.join(__dirname, '../dist/index.html'));

});

router.post('/api/search',  (req, res) => {
  yelp.getRestaurants(req, res);
});

router.post('/api/random-nearby', (req, res) => {
  yelp.getRandNearby(req, res);
});

router.post('/api/single', ( req, res) => {
  yelp.getSingle(req, res);
});

router.post('/api/single-category', ( req, res) => {
  yelp.getSingleCategory(req, res);
});

router.post('/api/scrape-reviews', ( req, res) => {
  //reviewScrape.scrapeReviews(req, res)
   yelp.getReviews(req, res);
});

router.post('/api/login',  ( req, res) => {
  userDB.loginCheck(req, res);
})

router.post('/api/signup', (req, res) => {
  userDB.createUser(req, res);
})

router.post('api/post-review', (req, res) => {

})


module.exports = router;
