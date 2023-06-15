const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

router.post('/criarPedido', pedidoController.salvar);
router.get('/pedidos', pedidoController.listarPedidos);
router.put('/editarStatus/:codigo/status', pedidoController.editarStatus);
router.get('/pedidosPorClientes/:clienteId', pedidoController.listarPedidoPorCliente);

module.exports = router;