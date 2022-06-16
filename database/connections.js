const mysql = require('mysql');
let dbConnection = mysql.createConnection({
  connectionLimit: 5,
  host: process.env.RDBHOST,
  database: process.env.RDBNAME,
  user: process.env.RDBUSER,
  password: process.env.RDBPASSWORD,
});

module.exports = dbConnection;
