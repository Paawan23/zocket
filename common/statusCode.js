let httpStatus = {
  INVALID_ARGUMENT: {
    status: false,
    statusCode: 422
  },
  INTERNAL_SERVER_ERROR: {
    status: false,
    statusCode: 500
  },
  CREATE: {
    status: true,
    statusCode: 201
  },
  SUCCESS: {
    status: true,
    statusCode: 200
  },
  DELETE: {
    status: true,
    statusCode: 202
  },
  ALREADY_EXISTS: {
    status: false,
    statusCode: 409
  },
  NOT_FOUND: {
    status: false,
    statusCode: 404
  }
}

module.exports = {
  httpStatus
}
