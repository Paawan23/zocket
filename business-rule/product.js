const {
  prisma,
  responseREST,
  responseWithError
} = require('../common/commonFunctions')
const { httpStatus } = require('../common/statusCode')

const saveProductInDb = async (req, res, option) => {
  try {
    if (option === 'CREATE') {
      const { product_name, product_image, price } = req.body

      const saveData = await prisma.product.create({
        data: {
          product_name: product_name,
          product_image: product_image,
          price: price,
          created_by: req.userInformation.userId
        }
      })
      return responseREST(
        res,
        httpStatus.CREATE,
        'Product has been created successfully!',
        saveData
      )
    }
  } catch (error) {
    return responseWithError(res, error)
  }
}

module.exports = { saveProductInDb }
