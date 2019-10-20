const express = require('express');
const router = express.Router();
const request = require('request');
const app = require('../app');
const yelp = require('../controllers/yelp');
var exports = module.exports = {};

// server side
router.get('/', function() {

});

router.post('/api/search', function (req, res) {
  console.log("Route Called");
  yelp.getRestaurants(req, res);
});

router.post('/api/random-nearby', function(req, res) {
  console.log("route Called");
  yelp.getRandNearby(req, res);
});


module.exports = router;
