const JWT        = require('jsonwebtoken');
const bcrypt     = require('bcrypt');
const xss        = require('xss');
const pool       = require('./connect-db');
require('dotenv').config();

var exports      = module.exports = {};

// Sanitize the input by the user.
// Validate the JWT
// Insert the review
// Send error if error
exports.prepareReview = (req, res) => {

  let review = req.body;
  let verified = JWT.verify(review.user.token, process.env.JWT_SECRET );
  review.user = review.user.id;
  review.text = xss(review.text)

  if(verified.data === 'foobar') {
    insertReview(review, res)
  }
  else {
    res.send('500 Error boiz');
  }

}

exports.getAllReviews = (req, res) => {

  let { business_id } = req.body;
  getAllReviews(business_id, res);

}

exports.getReviewsByUser = (req, res) => {

  const { user_id } = req.body;

  getReviewsByUsers(user_id).then(result => res.send(result ));
}

// Params - review object
const insertReview = (review, response) => {

  let { business_id, text, rating, user } = review;
  let reviewArray = [user, business_id, text, rating];

  // let insertQuery = 'INSERT INTO users(first_name, last_name, email, birth_date, password) VALUES ($1, $2, $3, $4, $5)';
  let statement = 'INSERT INTO reviews(user_id, business_id, review_text, rating) VALUES ($1, $2, $3, $4)';

  pool.query(statement, reviewArray, (err, res) => {
    if(res.rowCount == 1) {

      review.time_created = Date.now();
      response.send(review)
    }
    if(err) {
      response.send(err.error);
    }
  })
}

const getAllReviews = (id, response) => {

  let query = 'SELECT * FROM reviews WHERE business_id = $1';

  pool.query(query, [id], (err, res) => {

    if( err ) {
      console.log(err);
    }

    if(res.rows.length > 0) {
      response.send(res.rows);
    }
    else {
      response.send(err);
    }
  })
}

const getReviewsByUsers = (user_id) => {

  console.log( user_id );
  const query = 'SELECT * FROM reviews WHERE user_id = $1';

  return new Promise(function(resolve, reject){
    pool.query(query, [user_id], (err, res) => {
      // Name query has been successful, ned toi handle errors
      if(err) {
        reject(err);
      }
      else {
        console.log( res.rows);
        resolve(res.rows);

      }

    })
  })
}

