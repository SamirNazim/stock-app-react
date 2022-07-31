const express = require("express");
const router = express.Router();
const userDataServices = require("./tickerServices");
const userServices = require("./userServices.js");

router.post("/api/add?", userServices.verifyToken, userDataServices.addTicker);
router.post(
  "/api/update?",
  userServices.verifyToken,
  userDataServices.updateTicker
);

router.delete(
  "/api/delete/:id",
  userServices.verifyToken,
  userDataServices.deleteTicker
);

module.exports = router;
