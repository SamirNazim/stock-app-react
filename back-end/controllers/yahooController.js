const express = require('express')
const router = express.Router()
const yahooServices = require("./yahooServices.js")

router.get("/ticker/:symbol", yahooServices.getTickerFinancialData)
router.get("/chart/data?", yahooServices.getTickerChartData)

module.exports = router