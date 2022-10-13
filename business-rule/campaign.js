const {
  prisma,
  responseREST,
  responseWithError
} = require('../common/commonFunctions')
const { httpStatus } = require('../common/statusCode')

const saveCampaignInDb = async (req, res, option) => {
  try {
    if (option === 'CREATE') {
      const {
        campaign_type_id,
        product_id,
        campaign_start_date,
        campaign_end_date,
        campaign_budget,
        location_id,
        target_radius
      } = req.body

      // Check Campaign type in the DB
      const findCampaignType = await prisma.campaign_type.count({
        where: {
          campagin_type_id: campaign_type_id
        }
      })

      if (findCampaignType === 0) {
        return responseREST(
          res,
          httpStatus.NOT_FOUND,
          'Campaign type not found!',
          null
        )
      }

      // Check product in the DB
      const findProduct = await prisma.product.count({
        where: {
          product_id: product_id
        }
      })

      if (findProduct === 0) {
        return responseREST(
          res,
          httpStatus.NOT_FOUND,
          'Product not found!',
          null
        )
      }
      // Check location in the DB
      const findLocation = await prisma.location.count({
        where: {
          location_id: location_id
        }
      })

      if (findLocation === 0) {
        return responseREST(
          res,
          httpStatus.NOT_FOUND,
          'Location not found!',
          null
        )
      }

      const saveData = await prisma.campaign.create({
        data: {
          campagin_type_id: campaign_type_id,
          product_id: product_id,
          location_id: location_id,
          campaign_start_date: new Date(campaign_start_date),
          campaign_end_date: new Date(campaign_end_date),
          campaign_budget: campaign_budget,
          target_radius: target_radius,
          created_by: req.userInformation.userId
        }
      })
      return responseREST(
        res,
        httpStatus.CREATE,
        'Campaign has been created successfully!',
        saveData
      )
    }
  } catch (error) {
    return responseWithError(res, error)
  }
}
const removeCampaign = async (req, res) => {
  try {
    // Check whether the Campaign id exists or not
    const checkCampaignIdExistance = await prisma.campaign.count({
      where: {
        campaing_id: req.body.campaing_id
      }
    })

    if (checkCampaignIdExistance === 0) {
      return responseREST(
        res,
        httpStatus.NOT_FOUND,
        'Campaign not found!',
        null
      )
    }

    // Check whether the Campaign is already deleted or not
    const checkCampaignId = await prisma.campaign.count({
      where: {
        campaing_id: req.body.campaing_id,
        status: 2
      }
    })

    if (checkCampaignId > 0) {
      return responseREST(
        res,
        httpStatus.ALREADY_EXISTS,
        'Campaign has alreadt been deleted!',
        null
      )
    }

    await prisma.campaign.update({
      where: {
        campaing_id: req.body.campaing_id
      },
      data: {
        status: 2,
        deleted_at: new Date(),
        deleted_by: req.userInformation.userId
      }
    })
    return responseREST(
      res,
      httpStatus.DELETE,
      'Campaign has been deleted successfully!',
      null
    )
  } catch (error) {
    return responseWithError(res, error)
  }
}

const allCampaingsFromDb = async (req, res, option) => {
  try {
    if (option === 'ALL') {
      const getAllData = await prisma.campaign.findMany({
        where: {
          status: 1
        }
      })
      console.log('getAllData', getAllData)
      if (getAllData === 0) {
        return responseREST(
          res,
          httpStatus.NOT_FOUND,
          'No campaign found!',
          null
        )
      }
      return responseREST(res, httpStatus.SUCCESS, 'OK', getAllData)
    } else if (option === 'BY_PLATFORM') {
      const getCampaignTypes = await prisma.campaign_type.findMany({
        where: {
          platform_id: req.body.platform_id
        }
      })

      if (getCampaignTypes === 0) {
        return responseREST(
          res,
          httpStatus.NOT_FOUND,
          'No platform data found!',
          null
        )
      }

      let arr = []
      for (let i = 0; i < getCampaignTypes.length; i++) {
        arr.push(getCampaignTypes[i].campagin_type_id)
      }

      const getAllData = await prisma.campaign.findMany({
        where: {
          campagin_type_id: {
            in: arr
          }
        }
      })

      return responseREST(res, httpStatus.SUCCESS, 'OK', getAllData)
    } else if (option === 'BY_STATUS') {
      const getCampaigns = await prisma.campaign.findMany({
        where: {
          status: req.body.status
        }
      })

      if (getCampaigns === 0) {
        return responseREST(
          res,
          httpStatus.NOT_FOUND,
          'No campaign found!',
          null
        )
      }
      return responseREST(res, httpStatus.SUCCESS, 'OK', getCampaigns)
    }
  } catch (error) {
    return responseWithError(res, error)
  }
}

module.exports = { saveCampaignInDb, allCampaingsFromDb, removeCampaign }
