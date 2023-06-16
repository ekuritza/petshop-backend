const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const auth = require('../auth/auth');


router.use(auth.autorizar);

router.post('/criarPedido', pedidoController.salvar);
router.get('/pedidos', pedidoController.listarPedidos);
router.put('/atualizaStatus/:codigo', pedidoController.editarStatus);
router.get('/:codigoCliente', pedidoController.listarPedidoPorCliente);

module.exports = router;