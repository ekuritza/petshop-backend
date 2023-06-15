const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.post('/criaCategoria', categoriaController.salvar);
router.get('/categorias', categoriaController.listarCategorias);
router.put('/atualizarCategoria/:codigo', categoriaController.atualizarCategoria);
router.get('/buscarCategoria/:codigo', categoriaController.buscarPorCodigo);

module.exports = router;