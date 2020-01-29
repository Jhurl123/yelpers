// const router = express.Router();
const yelp       = require('../services/yelp');
var express      = require('express');
var yelpRouter   = express.Router();


yelpRouter.post('/search',  (req, res) => {
  yelp.getRestaurants(req, res);
});

yelpRouter.post('/random-nearby', (req, res) => {
  yelp.getRandNearby(req, res);
});

yelpRouter.post('/single', ( req, res) => {
  yelp.getSingle(req, res);
});

yelpRouter.post('/single-category', ( req, res) => {
  yelp.getSingleCategory(req, res);
});

yelpRouter.post('/scrape-reviews', ( req, res) => {
  //reviewScrape.scrapeReviews(req, res)
  yelp.getReviews(req, res);
});

module.exports = yelpRouter;
