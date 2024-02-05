const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./routes/user')
const Error404Handler = require('./app/exceptions/404')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3002

// app.use(cors())
console.log('HEY')
const allowCrossDomain = (req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `https://project-pakam.vercel.app`);
  res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
  res.header(`Access-Control-Allow-Headers`, `Content-Type`);
  res.header(`Access-Control-Allow-Headers`, `Authorization`);
  next();
};

app.use(allowCrossDomain);

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