const express = require("express");
const router = express.Router();
const userServices = require("./userServices.js");

router.post("/api/register", userServices.register);
router.post("/api/login", userServices.login);
router.get("/api/checkuser?", userServices.checkUser);
router.get("/api/user", userServices.verifyToken, userServices.getUser);
router.get(
  "/api/refresh",
  userServices.refreshToken,
  userServices.verifyToken,
  userServices.getUser
);
router.post("/api/logout", userServices.verifyToken, userServices.logout);

module.exports = router;
