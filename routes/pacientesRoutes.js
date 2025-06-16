const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.get('/', pacienteController.getAllPacientes);
router.get('/nuevo', pacienteController.renderNewPacienteForm);
router.post('/', pacienteController.createPaciente);

module.exports = router;