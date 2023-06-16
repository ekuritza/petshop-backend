const clienteModel = require('../models/clienteModel');
const bcryptjs = require('bcryptjs');
const auth = require('../auth/auth');

class LoginController {
  async login(req, res) {
    const { email, senha } = req.body;
    const cliente = await clienteModel.findOne({ 'email': email }).select('+senha');
    
    if (!cliente) {
      return res.status(400).send({ error: 'Usuário não encontrado!' });
    }

    if (!(await bcryptjs.compare(senha, cliente.senha))) {
      return res.status(400).send({ error: 'Senha inválida!' });
    }

    // Verificar o token do cliente
    const tokenValido = auth.autorizar(cliente.token);

    if (!tokenValido) {
      return res.status(401).send({ error: 'Token inválido!' });
    }

    res.status(200).json(cliente);
  }
}

module.exports = new LoginController();
