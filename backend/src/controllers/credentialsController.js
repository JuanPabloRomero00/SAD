const { getAllCredentials: getAll, deactivateCredential: deactivate, getInactiveCredentials: getInactive } = require('../services/credentialsService');

// Obtener todas las credenciales
const getAllCredentials = async (req, res) => {
  try {
    const credentials = await getAll();
    res.json(credentials);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

// Baja lógica de credencial
const deactivateCredential = async (req, res) => {
  try {
    const credential = await deactivate(req.params.id);
    res.json({ message: "Credencial dada de baja.", credential });
  } catch (err) {
    res.status(err.status || 400).json({ error: err.message });
  }
};

// Obtener solo las credenciales dadas de baja
const getInactiveCredentials = async (req, res) => {
  try {
    const credentials = await getInactive();
    res.json(credentials);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

module.exports = { getAllCredentials, deactivateCredential, getInactiveCredentials };