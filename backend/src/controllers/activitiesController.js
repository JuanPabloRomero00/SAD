const { 
    createActivity: createActivityService,
    getAllActivities: getAllActivitiesService,
    getActivityById: getActivityByIdService,
    updateActivityById: updateActivityByIdService,
    joinActivity: joinActivityService,
    leaveActivity: leaveActivityService,
    filterActivities: filterActivitiesService,
    getUserActivities: getUserActivitiesService,
    getUserActivitiesHistory: getUserActivitiesHistoryService,
    deleteActivityById: deleteActivityByIdService
} = require("../services/activitiesService");

const createActivity = async (req, res) => {
    try {
        const activity = await createActivityService(req.body);
        return res.status(201).json(activity);
    } catch (err) {
        res.status(err.status || 400).json({
            error: "No se pudo crear la actividad",
            message: err.message,
        });
    }
};

const getAllActivities = async (req, res) => {
    try {
        // Si viene userId como query param, filtra por usuario
        if (req.query.userId) {
            const activities = await getUserActivitiesService(req.query.userId);
            return res.json(activities);
        }
        const activities = await getAllActivitiesService();
        res.json(activities);
    } catch (err) {
        res.status(500).json({ error: "No se encontraron las actividades", message: err.message });
    }
};

const getActivityById = async (req, res) => {
    try {
        const activity = await getActivityByIdService(req.params.id);
        if (!activity) return res.status(404).json({ error: "Actividad no encontrada" });
        res.json(activity);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener detalles de la actividad", message: err.message });
    }
};

const updateActivityById = async (req, res) => {
    try {
        const activity = await updateActivityByIdService(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!activity) return res.status(404).json({ error: "Actividad no encontrada" });
        res.json({ message: "Actividad actualizada correctamente", activity });
    } catch (err) {
        res.status(err.status || 400).json({ error: err.message });
    }
};

const joinActivity = async (req, res) => {
    try {
        const { userId } = req.body;
        const activity = await joinActivityService(req.params.id, userId);
        res.json({ message: "Usuario anotado correctamente", activity });
    } catch (err) {
        res.status(err.status || 400).json({ error: err.message });
    }
};

const leaveActivity = async (req, res) => {
    try {
        const { userId } = req.body;
        const activity = await leaveActivityService(req.params.id, userId);
        res.status(200).json({ message: "Usuario desanotado correctamente", activity });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
};

const filterActivities = async (req, res) => {
    try {
        const activities = await filterActivitiesService(req.query);
        res.json(activities);
    } catch (err) {
        res.status(500).json({ error: "Error al filtrar actividades", message: err.message });
    }
};

const getUserActivities = async (req, res) => {
    try {
        const activities = await getUserActivitiesService(req.params.id);
        res.json(activities);
    } catch (err) {
        res.status(err.status || 500).json({ error: "Error al obtener actividades", message: err.message });
    }
};

const getUserActivitiesHistory = async (req, res) => {
    try {
        const history = await getUserActivitiesHistoryService(req.params.id);
        res.json(history);
    } catch (err) {
        res.status(err.status || 500).json({ error: "Error al obtener historial de actividades", message: err.message });
    }
};

const deleteActivityById = async (req, res) => {
    try {
        const activity = await deleteActivityByIdService(req.params.id);
        if (!activity) return res.status(404).json({ error: "Actividad no encontrada" });
        res.status(200).json({ message: "Actividad eliminada correctamente" });
    } catch (err) {
        res.status(err.status || 500).json({ error: "Error al eliminar la actividad", message: err.message });
    }
};

module.exports = {
    createActivity, getAllActivities, getActivityById, updateActivityById, 
    joinActivity, leaveActivity, filterActivities, getUserActivities, 
    getUserActivitiesHistory, deleteActivityById
};