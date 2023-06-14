const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  codigo: Number,
  nomeCompleto: String,
  endereco: String,
  telefone: String,
  cpf: String,
  dadosCartao: {
    nomeCartao: String,
    numeroCartao: Number,
    cvc: Number
  },
  email: String,
  senha: String,
});

module.exports = mongoose.model('clientes', clienteSchema);
