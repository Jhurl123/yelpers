const Pool       = require('pg').Pool;
const JWT        = require('jsonwebtoken');
const bcrypt     = require('bcrypt');
const xss        = require('xss');
require('dotenv').config();
const saltRounds = 10;
var exports  = module.exports = {};

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL
// });

const prefix = (process.env.NODE_ENV === 'production') ? 'PROD' : 'LOCAL';
const pool = new Pool({
  connectionString: (process.env.NODE_ENV === 'production') ? process.env.DATABASE_URL : '',
  host: process.env[`${prefix}_DB_HOST`],
  user: process.env[`${prefix}_DB_USER`],
  password: process.env[`${prefix}_DB_PASS`],
  port: process.env[`${prefix}_DB_PORT`],
  database: process.env[`${prefix}_DB_NAME`]

});
// Test
// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// Function that confirms user information submitted in the login inputs
exports.loginCheck = function(request, response) {

  // TODO include XSS library to prevent XSS

  // user entered data from the login form
  let emailAddress = request.body.emailAddress;

  let pwd = request.body.password;

  let userQuery = 'SELECT id, email, password FROM users WHERE email = $1 LIMIT 1';
  let values    = [emailAddress];

  // query the users info to ensure login
  pool.query(userQuery, values, (err, res) => {
    if(err) {
      console.log(err.stack);
    }
    else {

      if( res.rows[0] ) {
        var returnValue = res.rows[0];
        // Compare user entered password with hash from  the db
        bcrypt.compare(pwd, returnValue.password, compareCallback.bind(this, returnValue, response));
      }
      else {
          let message = "No User found with this email!";
          response.send(formatResponse(false, message));
          return false;
      }
    }
  })
}

exports.createUser = function (request, response) {
  let userInfo = request.body;
  let password = userInfo.passwords.password;
  let insertQuery = 'INSERT INTO users(first_name, last_name, email, birth_date, password) VALUES ($1, $2, $3, $4, $5)';
  let testQuery   = 'SELECT email FROM users WHERE email = $1';

  // TODO include XSS library to prevent XSS

  bcrypt.hash(password, saltRounds, function(err, hash) {

    // insert the hashed passsword into the user object
    userInfo.passwords = hash;
    let values = Object.values(userInfo);

    // if string is empty, replace with null
    values = values.map(x => x === '' ? null : x);

    pool.query(testQuery, [userInfo.emailAddress], async (err, res) => {

      if(err) {
        console.log(err)
      }
      else {
        let rows = res.rows[0];

        if(rows) {
          console.log("this user already exists!");
          response.send(false);
        }
        else {
          await insertUser();
        }
      }
    });

    // Function to insert the user into the database
    let insertUser = () => {
          pool.query(insertQuery, values, (err, res) => {
          if(err) {
            console.log(err);
          }
          else {
            response.send(true);
          }
        })
      }
  })


}

// TODO Make a delete user function

// Function to send message based on result of callback
// Params: User Object, Response From route, Error message on comparison, result of the comparison:boolean
var compareCallback = function(returnValue, response, err, res)  {
  if(err) {
    console.log(err);
  }
  else {
    if(res) {

      // TODO Store secret key in environment variable
      let token = JWT.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: 'foobar'
      }, 'secret');

      returnValue.token = token;
      response.send(returnValue);
    }
    else {
      let message = "Entered password doesn't match the password associated with this email";
      response.send(formatResponse(false, message));
    }
  }

}

// Function to set the object that gets returned to the app
var formatResponse = (bool, message) => {
  return {response: bool, message: message};
}




