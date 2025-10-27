const express = require("express");
const router = express.Router();
const {
    getSecurityQuestion
} = require("../controllers/authController");

// Ruta para obtener pregunta de seguridad por email
router.get("/get-security-question", getSecurityQuestion);

module.exports = router;