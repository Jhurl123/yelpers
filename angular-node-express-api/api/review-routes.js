const express = require('express');
const router = express.Router();
const reviewsDB = require('../database/reviews-db');

// api/reviews/
router.post('/create' , (req, res) => {

  reviewsDB.prepareReview(req, res);

})

module.exports = router;
