const { saveProductInDb } = require('../business-rule/product')
const {
  Joi,
  responseREST,
  responseWithError
} = require('../common/commonFunctions')
const { httpStatus } = require('../common/statusCode')

const createProduct = async (req, res) => {
  try {
    const productValidate = Joi.object({
      product_name: Joi.string()
        .max(256)
        .required(),
      product_image: Joi.string().required(),
      price: Joi.string()
        .min(1)
        .required()
    })
    const validate = productValidate.validate(req.body)
    if (validate.error) {
      return responseREST(
        res,
        httpStatus.INVALID_ARGUMENT,
        'argument validation error',
        null,
        validate.error.details[0].message
      )
    }
    return await saveProductInDb(req, res, 'CREATE')
  } catch (error) {
    return responseWithError(res, error)
  }
}

module.exports = { createProduct }
