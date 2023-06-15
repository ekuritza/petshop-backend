const categoriaModel = require('../models/categoriaModel');

class CategoriaController {

async salvar(req, res) {
    const categoria = req.body;
    const max = await categoriaModel.findOne({}).sort({ codigo: -1 });
    categoria.codigo = max == null ? 1 : max.codigo + 1;

    const resultado = await categoriaModel.create(categoria);
    res.status(201).json(resultado);
    }

    async listarCategorias(req, res) {
        const resultado = await categoriaModel.find({});
        res.status(200).json(resultado);
    }

    async atualizarCategoria(req, res) {
        const codigo = req.params.codigo;
        const _id = String((await categoriaModel.findOne({ 'codigo': codigo }))._id);

        const categoria = req.body;

        await categoriaModel.findByIdAndUpdate(String(_id), categoria);
        res.status(200).send();
    }

    async buscarPorCodigo(req, res) {
        const codigo = req.params.codigo;
        try {
            const categoria = await categoriaModel.findOne({ 'codigo': codigo});
            if (categoria) {
                res.status(200).json(categoria);
            } else {
                res.status(404).json({ erro: 'Categoria não encontrada!'});
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar categoria' });
        }
    };
}

module.exports = new CategoriaController();