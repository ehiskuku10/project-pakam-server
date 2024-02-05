const Pool = require('pg').Pool

exports.pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  port: 5432, 
})