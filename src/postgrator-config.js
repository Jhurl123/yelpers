require('dotenv').config();

module.exports = {
  "PRODDirectory": "PRODs",
  "driver": "pg",
  "host": process.env.LOCAL_DB_HOST,
  "port": process.env.LOCAL_DB_PORT,
  "database": process.env.LOCAL_DB_NAME,
  "username": process.env.LOCAL_DB_USER,
  "password": process.env.LOCAL_DB_PASS
}
