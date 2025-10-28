const Activity = require('../models/Activity');
const User = require('../models/User');

async function createActivity(activityData) {
    const activity = new Activity(activityData);
    await activity.save();
    return activity;
}

function getAllActivities() {
    return Activity.find().sort({ date: 1 });
}

function getActivityById(id) {
    return Activity.findById(id).populate("participants", "name email");
}

async function updateActivityById(id, updateData, options = { new: true, runValidators: true }) {
    const activity = await Activity.findByIdAndUpdate(id, updateData, options);
    return activity;
}

async function joinActivity(activityId, userId) {
    // Validaciones básicas
    if (!userId) {
        const err = new Error("El ID del usuario es requerido");
        err.status = 400;
        throw err;
    }

    const activity = await Activity.findById(activityId);
    if (!activity) {
        const err = new Error("Actividad no encontrada");
        err.status = 404;
        throw err;
    }

    // Verificar si el usuario ya está anotado
    if (activity.participants.includes(userId)) {
        const err = new Error("El usuario ya está anotado en esta actividad");
        err.status = 400;
        throw err;
    }

    activity.participants.push(userId);
    await activity.save();
    return activity;
}

async function leaveActivity(activityId, userId) {
    // Validaciones básicas
    if (!userId) {
        const err = new Error("El ID del usuario es requerido");
        err.status = 400;
        throw err;
    }

    const activity = await Activity.findById(activityId);
    if (!activity) {
        const err = new Error("Actividad no encontrada");
        err.status = 404;
        throw err;
    }

    // Verificar si el usuario está inscrito en la actividad
    const isParticipant = activity.participants.some((id) => id.toString() === userId.toString());
    if (!isParticipant) {
        const err = new Error("El usuario no está inscrito en esta actividad");
        err.status = 400;
        throw err;
    }

    // Remover al usuario de la lista de participantes
    activity.participants = activity.participants.filter((id) => id.toString() !== userId.toString());

    // Agregar al historial de bajas
    activity.pastParticipants.push({ userId, removedAt: new Date() });
    await activity.save();
    return activity;
}

function filterActivities(filters) {
    const { title, day, time } = filters;
    
    const filter = {};
    if (title) filter.title = { $regex: title, $options: "i" };
    if (day) filter.days = Number(day);
    if (time) filter.time = time;
    
    return Activity.find(filter);
}

async function getUserActivities(userId) {
    const user = await User.findById(userId);
    if (!user) {
        const err = new Error("Usuario no encontrado");
        err.status = 404;
        throw err;
    }
    
    return Activity.find({ participants: user._id });
}

async function getUserActivitiesHistory(userId) {
    const user = await User.findById(userId);
    if (!user) {
        const err = new Error("Usuario no encontrado");
        err.status = 404;
        throw err;
    }

    const activities = await Activity.find({
        $or: [
            { participants: user._id },
            { "pastParticipants.userId": user._id },
        ],
    });

    const history = activities.map((activity) => {
        const wasRemoved = activity.pastParticipants?.some(
            (p) => p.userId.toString() === user._id.toString()
        );

        return {
            activityId: activity._id,
            title: activity.title,
            description: activity.description,
            days: activity.days,
            time: activity.time,
            wasRemoved,
        };
    });

    return history;
}

async function deleteActivityById(id) {
    const activity = await Activity.findByIdAndDelete(id);
    return activity;
}

module.exports = {
    createActivity, getAllActivities, getActivityById, updateActivityById, 
    joinActivity, leaveActivity, filterActivities, getUserActivities, 
    getUserActivitiesHistory, deleteActivityById
};
