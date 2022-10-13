const { saveCampaignTypeInDb } = require('../business-rule/campaignType')
const {
  Joi,
  responseREST,
  responseWithError
} = require('../common/commonFunctions')
const { httpStatus } = require('../common/statusCode')

const createCampaignType = async (req, res) => {
  try {
    const CampaignTypeValidate = Joi.object({
      campaign_type_name: Joi.string()
        .max(256)
        .required(),
      platform_id: Joi.string()
        .uuid()
        .required()
    })
    const validate = CampaignTypeValidate.validate(req.body)
    if (validate.error) {
      return responseREST(
        res,
        httpStatus.INVALID_ARGUMENT,
        'argument validation error',
        null,
        validate.error.details[0].message
      )
    }
    return await saveCampaignTypeInDb(req, res, 'CREATE')
  } catch (error) {
    return responseWithError(res, error)
  }
}

module.exports = { createCampaignType }
