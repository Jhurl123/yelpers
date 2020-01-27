const express = require('express');
const router = express.Router();
const reviewsDB = require('../database/reviews-db');

// api/reviews/
router.post('/create', (req, res) => {

  console.
  reviewsDB.prepareReview(req, res);

})

router.post('/getAll', (req, res) => {

  reviewsDB.getAllReviews(req, res);
});

module.exports = router;
