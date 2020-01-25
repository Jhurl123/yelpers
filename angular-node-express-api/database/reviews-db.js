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
  /*

  {
    business_id: "iLbC7CRoNRmgLGoZ2WDeLA",
    text: "fsdfsd",
    rating: "3",
    user: {…}}
    user: id: 4email: "sgtbaker99@gmail.com"
    password: "$2b$10$Ub0sf2uve2v1qsD1uSlmu.C4X6no9TuVypzz1kAhzG3j827mX87lO"
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Nzk5MTM1OTYsImRhdGEiOiJmb29iYXIiLCJpYXQiOjE1Nzk5MDk5OTZ9.Gl0aUhteVwurncVvCI8m_L_5gcxI8yOwFNJ0_ynFqNE"__proto__: Object__proto__: Object
*/

  let review = req.body;
  let verified = JWT.verify(review.user.token, process.env.JWT_SECRET );
  review.user = review.user.id;
  review.text = xss(review.text)

  console.log( verified );
  if(verified.data === 'foobar') {
    insertReview(review)
  }
  else {
    res.send('500 Error boiz');
  }

}

// Params - review object
var insertReview = (review) => {

  let { business_id, text, rating, user } = review;
  let reviewArray = [user, business_id, text, rating];

  console.log(reviewArray)
  // let insertQuery = 'INSERT INTO users(first_name, last_name, email, birth_date, password) VALUES ($1, $2, $3, $4, $5)';
  let statement = 'INSERT INTO reviews(user_id, business_id, review_text, rating) VALUES ($1, $2, $3, $4)';

  pool.query(statement, reviewArray, (err, res) => {
    console.log(res)
    console.log( err );
  })
}

