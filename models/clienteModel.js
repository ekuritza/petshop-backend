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
},
imagem: Buffer
});

clienteSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) {
    return next();
  }
  try {
    const hash = await bcryptjs.hash(this.senha, 10);
    this.senha = hash;
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('clientes', clienteSchema);
