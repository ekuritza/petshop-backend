const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/criaProduto', upload.single('imagem'), produtoController.salvar);
router.get('/produtos', produtoController.listarProdutos);
router.get('/buscarProduto/:codigo', produtoController.buscarProdutoPorCodigo);
router.put('/atualizarProduto/:codigo', produtoController.atualizarProduto);


module.exports = router;