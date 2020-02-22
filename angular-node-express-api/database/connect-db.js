const dotenv = require('dotenv').config();
const Pool   = require('pg').Pool;

const prefix = (process.env.NODE_ENV === 'production') ? 'PROD' : 'LOCAL';
// This version of the connection string messes up local db, Find true dynamic solution
const pool = new Pool({
  // connectionString:  process.env.DATABASE_URL,
  host: process.env[`${prefix}_DB_HOST`],
  user: process.env[`${prefix}_DB_USER`],
  password: process.env[`${prefix}_DB_PASS`],
  port: process.env[`${prefix}_DB_PORT`],
  database: process.env[`${prefix}_DB_NAME`]
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

module.exports = pool;
