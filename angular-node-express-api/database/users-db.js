const Pool = require('pg').Pool
const JWT  = require('jsonwebtoken')
var exports = module.exports = {};
// TODO Insert these into the .env file to obscure from view
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'yelpers',
  password: 'test',
  port: 5432,
});

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

exports.loginCheck = function(request, response) {


  let emailAddress = request.body.emailAddress;
  let pwd = request.body.password;

  pool.query(`SELECT id, email,first_name, last_name FROM users WHERE email = '${emailAddress}' AND password = '${pwd}' LIMIT 1`, function(err, res) {
    if(err) {
      console.log(err.stack);
    }
    else {
      let rows = res.rows;

      console.log(rows)
      if( res.rows[0] ) {

        let returnValue = res.rows[0];

        if(!returnValue) {
          response.send(false)
        }
        else {

          // Store secret key in environment variable
          let token = JWT.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: 'foobar'
          }, 'secret');

          returnValue.token = token;
          response.send(returnValue)
        }
      }
    }
  })
}




