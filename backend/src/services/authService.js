const User = require("../models/User");
const login = require("./userService").login;

async function getSecurityQuestion(email) {
    const user = await User.findOne({ email });
    if (!user) {
        return null;
    }
    return {
        securityQuestion: user.securityQuestion,
        userId: user._id
    };
}

async function verifySecurity(email, securityAnswer) {
    const user = await User.findOne({ email });
    if (!user) {
        const err = new Error("Usuario no encontrado");
        err.status = 404;
        throw err;
    }

    if (user.securityAnswer.toLowerCase().trim() !== securityAnswer.toLowerCase().trim()) {
        const err = new Error("La respuesta de seguridad no es correcta");
        err.status = 400;
        throw err;
    }

    return {
        securityQuestion: user.securityQuestion,
        userId: user._id,
    };
}

async function resetPassword(userId, newPassword) {
    const user = await User.findById(userId);
    if (!user) {
        const err = new Error("Usuario no encontrado");
        err.status = 404;
        throw err;
    }

    user.password = newPassword;
    await user.save();
    return user;
}

const loginUser = async (dni, password) => {
  if (!dni || !password) {
    const error = new Error('DNI y contraseña son requeridos');
    error.status = 400;
    throw error;
  }

  const user = await User.findOne({ dni });
  if (!user) {
    const error = new Error('Usuario no encontrado');
    error.status = 400;
    throw error;
  }

  if (user.password !== password) {
    const error = new Error('Contraseña incorrecta');
    error.status = 400;
    throw error;
  }

  // Retornar todos los campos relevantes para el perfil
  return {
    id: user._id,
    dni: user.dni,
    name: user.name,
    surname: user.surname,
    birthdate: user.birthdate,
    plan: user.plan,
    phone: user.phone,
    email: user.email,
    address: user.address,
    role: user.role,
    active: user.active
  };
};

module.exports = {
  getSecurityQuestion,
  verifySecurity,
  resetPassword,
  loginUser
};