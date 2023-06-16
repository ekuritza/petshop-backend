const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  codigo: Number,
  nome: String,
  descricao: String,
  preco: Number,
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'categoria' },
  animal: String,
  comentario: String,
  nota: Number,
  notaTotal:Number,
  imagem: Buffer
});

module.exports = mongoose.model('produto', produtoSchema);