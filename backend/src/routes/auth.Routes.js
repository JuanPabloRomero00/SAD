const express = require("express");
const router = express.Router();
const {
  loginUser,
  getSecurityQuestion,
  verifySecurity,
  resetPassword
} = require("../controllers/authController");

router.post("/login", loginUser);
router.post("/security-question", getSecurityQuestion);
router.post("/verify-security", verifySecurity);
router.post("/reset-password", resetPassword);

module.exports = router;