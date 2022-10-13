const { Joi } = require('../common/commonFunctions')

const registerUser = async () => {
  try {
    const userValidate = Joi.object({
      email_id: Joi.string()
        .email({ tlds: { allow: false } })
        .max(256)
        .required(),

      remember_me: Joi.boolean().allow(null)
    })
    const validate = userValidate.validate(req.body)
    if (validate.error) {
      logger.warn(
        functionName,
        null,
        req,
        'In-Valid Argument Passed' + validate.error.details[0].message
      )
      return responseREST(
        res,
        httpStatus.INVALID_ARGUMENT,
        req.t('msg.argument_validation_error'),
        null,
        validate.error.details[0].message
      )

      return await userRegister(req, res)
    }
  } catch (error) {}
}

module.exports = {
  registerUser
}
