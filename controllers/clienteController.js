const clienteModel = require('../models/clienteModel');
const auth = require('../auth/auth');


class ClienteController {
    async salvar(req, res) {
        const cliente = req.body;
        const max = await clienteModel.findOne({}).sort({ codigo: -1 });
        cliente.codigo = max == null ? 1 : max.codigo + 1;
      
        if (await clienteModel.findOne({ email: cliente.email })) {
          return res.status(400).send({ error: 'Cliente já cadastrado!' });
        }
        const resultado = await clienteModel.create(cliente);
      
        res.status(201).json(resultado);
      }

    async listar(req, res) {
        const resultado = await clienteModel.find({});
        res.status(200).json(resultado);
    }

    async buscarPorCodigo(req, res) {
        const codigo = req.params.codigo;
        try {
            const cliente = await clienteModel.findOne({ 'codigo': codigo});
            if (cliente) {
                res.status(200).json(cliente);
            } else {
                res.status(404).json({ erro: 'Cliente não encontrado!'});
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar cliente' });
        }
    };

    async atualizar(req, res) {
        const codigo = req.params.codigo;
        const _id = String((await clienteModel.findOne({ 'codigo': codigo }))._id);

        const cliente = req.body;

        await clienteModel.findByIdAndUpdate(String(_id), cliente);
        res.status(200).send();
    }
      
}

module.exports = new ClienteController();