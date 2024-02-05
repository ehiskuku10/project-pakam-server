const { verifyToken } = require('../utils/jwt')

exports.isLoggedIn = (request, response, next) => {
  try {
    let token = request.header('Authorization')
    
    if(token) {
      if(verifyToken(token)) {
        return next()
      }
    }

    response.status(400).json({
      status: 'failed',
      message: `You are not logged in!`
    })
  }catch(error) {
    response.status(500).send({
      status: 'failed',
      message: `Something we didn't expect has happened!`
    })
  }
}

exports.notLogged = (request, response, next) => {
  try {
    let token = request.header('Authorization')
    
    if(token) {
      if(verifyToken(token)) {
        return response.status(400).json({
          status: 'failed',
          message: `You are already logged in!`
        })
      }
    }

    return next()
  }catch(error) {
    response.status(500).send({
      status: 'failed',
      message: `Something we didn't expect has happened!`
    })
  }
}