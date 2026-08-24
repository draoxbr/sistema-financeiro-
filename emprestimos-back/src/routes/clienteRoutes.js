const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');


router.post('/clientes', clienteController.criar);
router.get('/clientes', clienteController.listarTodos);
router.get('/clientes/:id', clienteController.getPorId);
router.put('/clientes/:id', clienteController.update);
router.delete('/clientes/:id', clienteController.excluir);


router.post('/clientes-loans', clienteController.analiseEmprestimo);

module.exports = router;