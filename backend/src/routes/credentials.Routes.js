const express = require('express');
const { getAllCredentials, deactivateCredential, getInactiveCredentials } = require('../controllers/credentialsController');

const router = express.Router();

// Obtener todas las credenciales (GET /credentials)
router.get('/', getAllCredentials);

// Obtener solo las credenciales dadas de baja (GET /credentials/inactive)
router.get('/inactive', getInactiveCredentials);

// Baja lógica de credencial (PATCH /credentials/:id/deactivate)
router.patch('/:id/deactivate', deactivateCredential);

module.exports = router;