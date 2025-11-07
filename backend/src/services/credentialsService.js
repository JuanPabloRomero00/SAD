const Credential = require('../models/Credential');

// Obtener todas las credenciales
const getAllCredentials = () => {
  return Credential.find();
};

// Baja lógica de credencial
const deactivateCredential = async (id) => {
  const credential = await Credential.findByIdAndUpdate(
    id,
    { active: false },
    { new: true }
  );
  
  if (!credential) {
    const error = new Error('Credencial no encontrada');
    error.status = 404;
    throw error;
  }
  
  return credential;
};

// Obtener solo las credenciales dadas de baja
const getInactiveCredentials = () => {
  return Credential.find({ active: false });
};

module.exports = { getAllCredentials, deactivateCredential, getInactiveCredentials };