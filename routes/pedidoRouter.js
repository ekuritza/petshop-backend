const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.post('/criarPedido', pedidoController.salvar);
router.get('/pedidos', pedidoController.listarPedidos);
router.put('/atualizaStatus/:codigo', pedidoController.editarStatus);
router.get('/:codigoCliente', pedidoController.listarPedidoPorCliente);

module.exports = router;