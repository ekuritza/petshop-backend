const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

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
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
},
senha: {
    type: String,
    required: true,
    select: false
},
token: {
  type: String,
  select: false
}
});

clienteSchema.pre('save', async function (next) {
  const hash = await bcryptjs.hash(this.senha, 10);
  this.senha = hash;
  next();
});

module.exports = mongoose.model('clientes', clienteSchema);
