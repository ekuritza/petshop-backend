const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/criaCliente', upload.single('imagem'), clienteController.salvar);
router.get('/clientes', clienteController.listar);
router.get('/:codigo', clienteController.buscarPorCodigo);
router.put('/:codigo', clienteController.atualizar);


module.exports = router;
