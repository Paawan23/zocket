const { savePlatformInDb } = require('../business-rule/platform')
const { Joi, responseWithError } = require('../common/commonFunctions')
const { httpStatus } = require('../common/statusCode')

const createPlatform = async (req, res) => {
  try {
    const PlatformValidate = Joi.object({
      platform_name: Joi.string()
        .max(20)
        .required()
    })
    const validate = PlatformValidate.validate(req.body)
    if (validate.error) {
      return responseREST(
        res,
        httpStatus.INVALID_ARGUMENT,
        'argument validation error',
        null,
        validate.error.details[0].message
      )
    }
    return await savePlatformInDb(req, res, 'CREATE')
  } catch (error) {
    return responseWithError(res, error)
  }
}

module.exports = { createPlatform }
