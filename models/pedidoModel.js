const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  codigo: Number,
  preco: Number,
  produtos: [
    {
      produto: { type: mongoose.Schema.Types.ObjectId, ref: 'produto' },
      quantidade: Number
    }
  ],
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'clientes' },
  data: { type: Date, default: Date.now },
  status: String
});

module.exports = mongoose.model('pedido', pedidoSchema);