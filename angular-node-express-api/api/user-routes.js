const express = require('express');
const router = express.Router();
const userDB = require('../database/users-db');

router.post('/login',  ( req, res) => {
  userDB.loginCheck(req, res);
})

router.post('/signup', (req, res) => {
  userDB.createUser(req, res);
})

router.post('/getUser', (req, res) => {
  userDB.getUser(req, res);
})

module.exports = router;
