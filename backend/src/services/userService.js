const User = require("../models/User");
const Credential = require("../models/Credential");
const Activity = require("../models/Activity");

async function createUser(userData) {
    // Validaciones básicas
    if (!userData.email) {
        const err = new Error("Email requerido");
        err.status = 400;
        throw err;
    }
    if (!userData.dni) {
        const err = new Error("DNI requerido");
        err.status = 400;
        throw err;
    }

    // Verificar si el email ya existe
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      const err = new Error("Email ya registrado");
      err.status = 400;
      throw err;
    }

    // Crear y guardar usuario
    const user = new User(userData);
    await user.save();

    // Crear la credencial digital
    const memberId = `${user._id}-${user.dni}`;
    const credential = new Credential({
      name: user.name,
      surname: user.surname,
      dni: user.dni,
      birthdate: user.birthdate,
      memberId: memberId,
      role: user.role || "user",
    });
    await credential.save();

    // Retornar el usuario (sin campos sensibles si los hay)
    const userObj = user.toObject();
    delete userObj.password; // si existe
    return { user: userObj, credentialId: credential._id };
}

function getAllUsers() {
    return User.find({});
}

function getUserById(id) {
    return User.findById(id);
}

async function updateUserById(id, updateData, options = {}) {
    const user = await User.findByIdAndUpdate(id, updateData, options);
    return user;
}

async function updateRoleByUserId(id, role) {
    //Validaciones básicas
    if (!role) {
      const err = new Error("El campo 'role' es requerido");
      err.status = 400;
      throw err;
    }
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );
    return user;
}

async function deleteUserById(id) {
    const user = await User.findByIdAndUpdate(
      id,
      { active: false },
      { new: true },
    );
    return user;
}


const getInactiveUsers = () => {
  return User.find({ active: false });
};


const assignPlanToUser = async (userId, planId) => {
  if (!planId) {
    const error = new Error('El campo planId es requerido');
    error.status = 400;
    throw error;
  }

  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('Usuario no encontrado');
    error.status = 404;
    throw error;
  }

  if (user.role !== "user") {
    const error = new Error('Solo los usuarios con rol user pueden elegir un plan');
    error.status = 403;
    throw error;
  }

  user.plan = planId;
  await user.save();
  return user;
};

async function getUserActivities(userId) {
    const user = await User.findById(userId);
    if (!user) {
        const error = new Error("Usuario no encontrado");
        error.status = 404;
        throw error;
    }
    
    return Activity.find({ participants: user._id });
}

module.exports = { 
  createUser, 
  getAllUsers, 
  getUserById, 
  updateUserById, 
  updateRoleByUserId, 
  deleteUserById,
  getInactiveUsers,
  assignPlanToUser,
  getUserActivities
};
