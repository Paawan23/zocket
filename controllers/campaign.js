// const { saveCampaignTypeInDb } = require('../business-rule/campaignType')
const {
  saveCampaignInDb,
  allCampaingsFromDb
} = require('../business-rule/campaign')
const {
  Joi,
  responseREST,
  responseWithError
} = require('../common/commonFunctions')
const { httpStatus } = require('../common/statusCode')

const createCampaign = async (req, res) => {
  try {
    const CampaignValidate = Joi.object({
      campaign_type_id: Joi.string()
        .uuid()
        .required(),
      product_id: Joi.string()
        .uuid()
        .required(),
      campaign_start_date: Joi.string(),
      campaign_end_date: Joi.string(),
      campaign_budget: Joi.string().required(),
      location_id: Joi.string()
        .uuid()
        .required(),
      target_radius: Joi.number()
    })
    const validate = CampaignValidate.validate(req.body)
    if (validate.error) {
      return responseREST(
        res,
        httpStatus.INVALID_ARGUMENT,
        'argument validation error',
        null,
        validate.error.details[0].message
      )
    }
    return await saveCampaignInDb(req, res, 'CREATE')
  } catch (error) {
    return responseWithError(res, error)
  }
}

const deleteCampaign = async (req, res) => {
  try {
    const CampaignValidate = Joi.object({
      campaign_id: Joi.string()
        .uuid()
        .required()
    })
    const validate = CampaignValidate.validate(req.body)
    if (validate.error) {
      return responseREST(
        res,
        httpStatus.INVALID_ARGUMENT,
        'argument validation error',
        null,
        validate.error.details[0].message
      )
    }
    return await removeCampaign(req, res)
  } catch (error) {
    return responseWithError(res, error)
  }
}
const getAllCampaigns = async (req, res) => {
  try {
    return await allCampaingsFromDb(req, res, 'ALL')
  } catch (error) {
    return responseWithError(res, error)
  }
}
const getAllCampaignsByPlatform = async (req, res) => {
  try {
    const CampaignValidate = Joi.object({
      platform_id: Joi.string()
        .uuid()
        .required()
    })
    const validate = CampaignValidate.validate(req.body)
    if (validate.error) {
      return responseREST(
        res,
        httpStatus.INVALID_ARGUMENT,
        'argument validation error',
        null,
        validate.error.details[0].message
      )
    }
    return await allCampaingsFromDb(req, res, 'BY_PLATFORM')
  } catch (error) {
    return responseWithError(res, error)
  }
}
const getAllCampaignsByStatus = async (req, res) => {
  try {
    const CampaignValidate = Joi.object({
      status: Joi.number()
        .allow(1, 2, 3)
        .required()
    })
    const validate = CampaignValidate.validate(req.body)
    if (validate.error) {
      return responseREST(
        res,
        httpStatus.INVALID_ARGUMENT,
        'argument validation error',
        null,
        validate.error.details[0].message
      )
    }
    return await allCampaingsFromDb(req, res, 'BY_STATUS')
  } catch (error) {
    return responseWithError(res, error)
  }
}

module.exports = {
  createCampaign,
  getAllCampaigns,
  getAllCampaignsByPlatform,
  getAllCampaignsByStatus,
  deleteCampaign
}
