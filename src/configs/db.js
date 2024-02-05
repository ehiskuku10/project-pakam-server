const Pool = require('pg').Pool

exports.pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
})

// exports.pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   port: 5432,
// })

// https://project-pakam.vercel.app
// https://pakam-caa42362631b.herokuapp.com