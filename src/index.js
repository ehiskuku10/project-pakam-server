const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./routes/user')
const Error404Handler = require('./app/exceptions/404')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = 3002

app.use(cors())
app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (req, res) => res.status(200).send('Welcome to Pakam API'))
app.use('/user', userRouter)
app.use(Error404Handler)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})