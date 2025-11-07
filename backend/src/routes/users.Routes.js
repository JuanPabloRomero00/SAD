const express = require("express");
const router = express.Router();
const { 
  createUser, 
  getAllUsers,
  getUserById,
  updateUserById,
  updateRoleByUserId,
  deleteUserById,
  getInactiveUsers,
  assignPlanToUser
} = require("../controllers/userController");

// POST /users/create
router.post("/create", createUser);

// Obtener todos los usuarios (GET /users)
router.get("/", getAllUsers);

// Obtener solo los usuarios dados de baja (GET /users/inactive)
router.get("/inactive", getInactiveUsers);

// Obtener usuario por ID (GET /users/:id)
router.get("/:id", getUserById);

// Actualizar usuario por ID (PATCH /users/:id)
router.patch("/:id", updateUserById);

// Modificar el rol de un usuario por ID (PATCH /users/:id/role)
router.patch("/:id/role", updateRoleByUserId);

// Elegir o modificar el plan de un usuario (PATCH /users/:id/plan)
router.patch("/:id/plan", assignPlanToUser);

// Dar de baja lógica a un usuario por ID (PATCH /users/:id/deactivate)
router.patch("/:id/deactivate", deleteUserById);

module.exports = router;