const express = require("express");
const router = express.Router();
const { 
    createActivity,
    getAllActivities,
    getActivityById,
    updateActivityById,
    joinActivity,
    leaveActivity,
    filterActivities,
    getUserActivities,
    getUserActivitiesHistory,
    deleteActivityById
} = require("../controllers/activitiesController");

// Crear una actividad/taller (POST /activities)
router.post("/", createActivity);

// Obtener todas las actividades/talleres (GET /activities)
router.get("/", getAllActivities);

// Ruta para listar actividades según el filtro de actividad (GET /activities/filter)
router.get("/filter", filterActivities);

// Obtener detalles de una actividad específica (GET /activities/:id)
router.get("/:id", getActivityById);

// Actualizar actividad por ID (PATCH /activities/:id)
router.patch("/:id", updateActivityById);

// Ruta para actualizar una actividad (PUT /activities/:id)
router.put("/:id", updateActivityById);

// Anotar usuario a una actividad (POST /activities/:id/join)
router.post("/:id/join", joinActivity);

// Ruta para desanotar usuario de una actividad (POST /activities/:id/leave)
router.post("/:id/leave", leaveActivity);

// Ruta para eliminar una actividad (DELETE /activities/:id)
router.delete("/:id", deleteActivityById);

module.exports = router;
