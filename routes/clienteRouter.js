const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.post('/criaCliente', clienteController.salvar);
router.get('/clientes', clienteController.listar);
router.get('/:codigo', clienteController.buscarPorCodigo);
router.put('/:codigo', clienteController.atualizar);


module.exports = router;
