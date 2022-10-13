const verifyToken = async (req, res, next) => {
  try {
    req.userInformation = {}
    req.userInformation.userId = 'd17d5842-15cb-48a2-b24d-03764d4c0df5'
    next()
  } catch (error) {
    return res
      .status(403)
      .json({ status: false, code: 401, message: error.message })
  }
}
module.exports = { verifyToken }
