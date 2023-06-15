const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.post('/criaProduto', produtoController.salvar);
router.get('/produtos', produtoController.listarProdutos);
router.get('/buscarProduto/:codigo', produtoController.buscarProdutoPorCodigo);
router.put('/atualizarProduto/:codigo', produtoController.atualizarProduto);


module.exports = router;