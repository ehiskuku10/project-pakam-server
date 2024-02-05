const createError = require("http-errors");

const Error404 = function(req, res, next) {
  next(createError(404));
};

module.exports = Error404;