const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { 
  createUser, 
  getAllUsers,
  getUserById,
  updateUserById,
  updateRoleByUserId,
  deleteUserById
} = require("../controllers/userController");

// POST /users/create
router.post("/create", createUser);

// Obtener todos los usuarios (GET /users)
router.get("/", getAllUsers);

// Obtener usuario por ID (GET /users/:id)
router.get("/:id", getUserById);

// Actualizar usuario por ID (PATCH /users/:id)
router.patch("/:id", updateUserById);

// Modificar el rol de un usuario por ID (PATCH /users/:id/role)
router.patch("/:id/role", updateRoleByUserId);

// Dar de baja lógica a un usuario por ID (PATCH /users/:id/deactivate)
router.patch("/:id/deactivate", deleteUserById);

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
