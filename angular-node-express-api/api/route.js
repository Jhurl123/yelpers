const express = require('express');
const router = express.Router();
// const reviewScrape = require('../scrapeReviews');
var path = require('path');

var exports = module.exports = {};

// server side
router.get('*', (req, res) => {

  // This is the correct directory for serving in production res.sendFile(path.join(__dirname, '../../dist/index.html'));
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
  // This is the file for development
  // res.sendFile(path.join(__dirname, '../../dist/index.html'));

});

module.exports = router;
