const express = require("express");
const User = require("../models/User");
const router = express.Router();

// POST /login
router.post("/login", async (req, res) => {
  try {
    const { dni, password } = req.body;

    // Buscar usuario por DNI
    const user = await User.findOne({ dni });
    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    // Comparar contraseñas en texto plano
    if (user.password !== password) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    res.json({
      message: "Login exitoso",
      user: {
        id: user._id,
        dni: user.dni,
        name: user.name,
        role: user.role,
        phone: user.phone,
        email: user.email,
        address: user.address
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;
