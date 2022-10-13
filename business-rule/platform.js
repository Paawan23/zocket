const {
  prisma,
  responseREST,
  responseWithError
} = require('../common/commonFunctions')
const { httpStatus } = require('../common/statusCode')

const savePlatformInDb = async (req, res, option) => {
  try {
    if (option === 'CREATE') {
      const { platform_name } = req.body
      const findPlatform = await prisma.platform.count({
        where: {
          platform_name: { equals: platform_name, mode: 'insensitive' }
        }
      })

      if (findPlatform > 0) {
        return responseREST(
          res,
          httpStatus.ALREADY_EXISTS,
          'Platform already exists!',
          null
        )
      }
      const saveData = await prisma.platform.create({
        data: {
          platform_name: platform_name,
          created_by: req.userInformation.userId
        }
      })
      return responseREST(
        res,
        httpStatus.CREATE,
        'Platform created successfully!',
        saveData
      )
    }
  } catch (error) {
    return responseWithError(res, error)
  }
}

module.exports = { savePlatformInDb }
