const Joi = require('joi')
const { PrismaClient } = require('@prisma/client')
const { httpStatus } = require('./statusCode')
const prisma = new PrismaClient()

const responseREST = (res, httpResponse, message, data, error = null) => {
  return res.status(httpResponse.statusCode).json({
    statusCode: httpResponse.statusCode,
    status: httpResponse.status,
    message: message,
    data: data,
    error: error
  })
}

const responseWithError = (res, error) => {
  return res.status(httpStatus.INTERNAL_SERVER_ERROR.statusCode).json({
    status: httpStatus.INTERNAL_SERVER_ERROR.status,
    message: 'Internal server error',
    data: null,
    error: error.message
  })
}
module.exports = {
  Joi,
  responseREST,
  prisma,
  responseWithError
}
