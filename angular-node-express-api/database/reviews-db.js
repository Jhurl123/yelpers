const JWT        = require('jsonwebtoken');
const bcrypt     = require('bcrypt');
const xss        = require('xss');
const pool       = require('./connect-db');
require('dotenv').config();

var exports      = module.exports = {};

exports.insertReview = (req, res) => {
  console.log("poop")
}
