const express = require('express');
const router = express.Router();
const userDB = require('../database/users-db');

router.post('/login',  ( req, res) => {
  userDB.loginCheck(req, res);
})

router.post('/signup', (req, res, next) => {
  userDB.createUser(req, res, next);
})

router.post('/getUser', (req, res) => {
  userDB.getUser(req, res);
})

router.patch('/editUser', (req, res) => {
  userDB.editUser(req, res);
})

router.post('/getNumReviews', (req, res) => {
  userDB.getNumReviews(req, res);
})

module.exports = router;
