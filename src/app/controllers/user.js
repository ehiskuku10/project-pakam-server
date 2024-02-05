const bcrypt = require('bcryptjs')
const { pool } = require('../../configs/db')
const { generateToken } = require('../utils/jwt')

const createUserTable = (request, response) => {
  pool.query(
    `CREATE TABLE users (ID SERIAL PRIMARY KEY,
      first_name VARCHAR(30),
      last_name VARCHAR(30),
      user_name VARCHAR(30),
      password TEXT
    )`,
    (error, result) => {
      if (error) {
        throw error
      }

      response.json({ info: 'Node.js, Express, and Postgres API', result }
    )
  })
}

const createUser = async(request, response) => {
  const { first_name, last_name, user_name, password } = request.body

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  pool.query(
    'INSERT INTO users (first_name, last_name, user_name, password) VALUES ($1, $2, $3, $4) RETURNING *', 
    [first_name, last_name, user_name, hashedPassword], (error, results) => {
      if (error) {
        throw error
      }else {
        const user = results.rows[0]
        const token = generateToken(user)

        response.status(201).json({
          status: 'success',
          data: { token },
          message: `Login Successful`
        })
      }
  })
}

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }

    response.status(200).json({
      status: 'success',
      message: `Users Found`,
      data: { users: results.rows }
    })
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { first_name, last_name, user_name } = request.body

  pool.query(
    'UPDATE users SET first_name = $1, last_name = $2, user_name = $3 WHERE id = $4',
    [first_name, last_name, user_name, id],
    (error, results) => {
      if (error) {
        throw error
      }

      response.status(200).json({
        status: 'success',
        message: `User Modified`
      })
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }

    response.status(200).json({
      status: 'success',
      message: `User Deleted!`
    })
  })
}

const logIn = (request, response) => {
  const { user_name, password } = request.body

  pool.query('SELECT * FROM users WHERE user_name = $1', [user_name], async (error, results) => {
    if (error) {
      throw error
    }else if(!results.rows) {
      response.status(400).json({
        status: 'failed',
        message: `Invalid username or password`
      })
    }else {
      const user = results.rows[0]
      const validPassword = await bcrypt.compare(password, user.password)

      if(!validPassword) {
        response.status(400).json({
          status: 'failed',
          message: `Invalid username or password`
        })
      }else {
        const token = generateToken(user)

        response.status(200).json({
          status: 'success',
          data: { token },
          message: `Login Successful`
        })
      }
    }
  })
}

module.exports = {
  createUserTable,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  logIn
}