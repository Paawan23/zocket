const {
  prisma,
  responseREST,
  responseWithError
} = require('../common/commonFunctions')
const { httpStatus } = require('../common/statusCode')

const saveCampaignTypeInDb = async (req, res, option) => {
  try {
    if (option === 'CREATE') {
      const { campaign_type_name, platform_id } = req.body
      const findDuplicateCampaignType = await prisma.campaign_type.count({
        where: {
          campaign_type_name: {
            equals: campaign_type_name,
            mode: 'insensitive'
          }
        }
      })
      if (findDuplicateCampaignType > 0) {
        return responseREST(
          res,
          httpStatus.ALREADY_EXISTS,
          'Campaign type already exists!',
          null
        )
      }
      const findPlatform = await prisma.platform.findFirst({
        where: {
          platform_id: platform_id
        }
      })

      if (!findPlatform) {
        return responseREST(
          res,
          httpStatus.NOT_FOUND,
          'Platform not found!',
          null
        )
      }
      const saveData = await prisma.campaign_type.create({
        data: {
          campaign_type_name: campaign_type_name,
          platform_id: findPlatform.platform_id,
          created_by: req.userInformation.userId
        }
      })
      return responseREST(
        res,
        httpStatus.CREATE,
        'Campaign type created successfully!',
        saveData
      )
    }
    // else if(option === "UPDATE"){
    //   const { campaign_type_id, campaign_type_name, platform_id } = req.body

    //   const findDuplicateCampaignType = await prisma.campaign_type.count({
    //     where: {
    //       campaign_type_name: {
    //         equals: campaign_type_name,
    //         mode: 'insensitive'
    //       }
    //     }
    //   })
    //   if (findDuplicateCampaignType > 0) {
    //     return responseREST(
    //       res,
    //       httpStatus.ALREADY_EXISTS,
    //       'Campaign type already exists!',
    //       null
    //     )
    //   }
    //   const findPlatform = await prisma.platform.findFirst({
    //     where: {
    //       platform_id: platform_id
    //     }
    //   })

    //   if (!findPlatform) {
    //     return responseREST(
    //       res,
    //       httpStatus.NOT_FOUND,
    //       'Platform not found!',
    //       null
    //     )
    //   }
    //   const saveData = await prisma.campaign_type.create({
    //     data: {
    //       campaign_type_name: campaign_type_name,
    //       platform_id: findPlatform.platform_id,
    //       created_by: req.userInformation.userId
    //     }
    //   })
    //   return responseREST(
    //     res,
    //     httpStatus.CREATE,
    //     'Campaign type created successfully!',
    //     saveData
    //   )

    // }
  } catch (error) {
    return responseWithError(res, error)
  }
}

module.exports = { saveCampaignTypeInDb }
