const Pool = require('pg').Pool
var exports = module.exports = {};
// TODO Insert these into the .env file to obscure from view
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'yelpers',
  password: 'test',
  port: 5432,
});

exports.test = () => {
  pool.query('SELECT * FROM users', (err, res) => {
    if(err) {
      console.log(err.stack);
    }
    else {
      console.log(res.rows[0]);
    }
  })
}


