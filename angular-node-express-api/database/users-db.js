const JWT        = require('jsonwebtoken');
const bcrypt     = require('bcrypt');
const xss        = require('xss');
const pool       = require('./connect-db');
require('dotenv').config();
const saltRounds = 10;
const util = require('util')
var exports      = module.exports = {};

// Function that confirms user information submitted in the login inputs
exports.loginCheck = function(request, response) {

  // user entered data from the login form
  let emailAddress = xss(request.body.emailAddress);
  let pwd          = xss(request.body.password);

  let userQuery = 'SELECT id, first_name, last_name, email, password FROM users WHERE email = $1 LIMIT 1';
  let values    = [emailAddress];

  // query the users info to ensure login
  pool.query(userQuery, values, (err, res) => {
    if(err) {
      console.log(err.stack);
      response.status(409).json({
        message: 'Something went wrong!',
      })
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

exports.createUser = function (request, response, next) {
  let userInfo = request.body;
  let password = xss(userInfo.passwords.password);
  let insertQuery = 'INSERT INTO users(first_name, last_name, email, birth_date, password) VALUES ($1, $2, $3, $4, $5)';
  let testQuery   = 'SELECT email FROM users WHERE email = $1';

  bcrypt.hash(password, saltRounds, function(err, hash) {

    // insert the hashed passsword into the user object
    userInfo.passwords = hash;
    let values = Object.values(userInfo).map(result => xss(result));

    // if string is empty, replace th null
    values = values.map(x => x === '' ? null : x);

    pool.query(testQuery, [userInfo.emailAddress], async (err, res) => {

      if(err) {
        console.log( err );
        response.status(409).json({
          message: 'Something went wrong!',
        })
      }
      else {
        let rows = res.rows[0];

        if(rows) {
          response.status(409).json({
            message: 'A user with this email already exists!',
          })

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
            response.status(409).json({
              message: 'Sorry, something went wrong!'
            })
          }
          else {
            response.send(res);
          }
        })
      }
  })


}

exports.getUser = (request, response) => {
  let { user_id } = request.body;

  querySingleUser(user_id, response);

}

// Function to allow editing a user row in the table
exports.editUser = (request, response) => {

  let {queryString,values} = editUserquery(request.body);
  try {
    updateUser(queryString, values).then( result => {
      response.send(true)
    },
    reason => {
      response.status(409).json({
        message: 'Something went wrong!',
      })
    });
  }
  catch(error) {
    response.status(409).json({
      message: 'Something went wrong!',
    })
  }


}

// Get the number of reviews attached to the users
exports.getNumReviews = (request, response) => {

  const { userID } = request.body;

  const query = 'SELECT COUNT(*) FROM reviews WHERE user_id = $1';

  pool.query(query, [userID], (err, res) => {

    if(err) {
      response.status(409).json({
        message: 'Something went wrong!',
      })
    }
    else {
      const count = res.rows[0].count;
      if(count) {
        response.send(count);
      }
    }
    console.log( res );
  })
}

var editUserquery = (valuesObject) => {

  let values = Object.values(valuesObject);
  let keys = Object.keys(valuesObject);
  let { id } = valuesObject;

  values =  values.filter((value, index) => keys[index] !== 'id')
  let statements = values.map((value,index) => keys[index] + '= $' + (index + 1))

  return {
      queryString: `UPDATE users SET ${statements.join(', ')} WHERE id = ${id}`,
      values: values
  };
}


updateUser =  async (queryString, values) => {
  // Handle errors here
  var response;
  return new Promise(function(resolve, reject){
    pool.query(queryString, values, (err, res) => {
      // Errors handled in calling function
      if(err) {
        reject(err);
      }
      else {
        resolve(res.rowCount);
      }

    })
  })

}

var querySingleUser = (id, response) => {

  // if (!id) return;
  let query = 'SELECT id, first_name, last_name, email, birth_date, created_date FROM users WHERE id = $1 LIMIT 1';

  pool.query(query, [id], (err, res) => {

    if(res.rows.length > 0) {
      response.send(res.rows[0])
    }
    else {
      response.status(409).json({
        message: 'Something went wrong!',
      })
    }
  })
}
// TODO Make a delete user function

// Function to send message based on result of callback
// Params: User Object, Response From route, Error message on comparison, result of the comparison:boolean
var compareCallback = function(returnValue, response, err, res)  {
  if(err) {
    response.status(409).json({
      message: 'Something went wrong!',
    })
  }
  else {
    if(res) {


      let token = JWT.sign({
        data: 'foobar'
      }, process.env.JWT_SECRET);
      console.log( process.env.JWT_SECRET );
      console.log(token)

      returnValue.token = token;
      returnValue.password = '';
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




