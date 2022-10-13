const express = require('express')
const {
  createCampaign,
  getAllCampaigns,
  getAllCampaignsByPlatform,
  getAllCampaignsByStatus
} = require('../controllers/campaign')
const { createCampaignType } = require('../controllers/campaign_type')
const { createPlatform } = require('../controllers/platform')
const { createProduct } = require('../controllers/product')

const router = express.Router()

/** campaign_type APIs */
router.post(`/create-campaignType`, createCampaignType)

router.post(`/create-platform`, createPlatform)

router.post(`/create-product`, createProduct)

router.post(`/create-campaign`, createCampaign)
router.get(`/getAllCampaigns`, getAllCampaigns)
router.get(`/getAllCampaignsByPlatform`, getAllCampaignsByPlatform)
router.get(`/getAllCampaignsByStatus`, getAllCampaignsByStatus)

module.exports = router
