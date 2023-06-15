const Pedido = require('../models/pedidoModel');
const Produto = require('../models/produtoModel');
const Cliente = require('../models/clienteModel');

class PedidoController {
  async salvar(req, res) {
    try {
      const max = await Pedido.findOne({}).sort({ codigo: -1 });
      const pedido = req.body;
      pedido.codigo = max ? max.codigo + 1 : 1;
  
      const cliente = await Cliente.findOne({ codigo: pedido.cliente });
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      pedido.cliente = cliente._id;
  
      const produtosDoPedido = [];
      for (const { produto, quantidade } of pedido.produtos) {
        const produtoEncontrado = await Produto.findOne({ codigo: produto });
        if (!produtoEncontrado) {
          return res.status(404).json({ error: `Produto ${produto} não encontrado` });
        }
        produtosDoPedido.push({
          produto: produtoEncontrado._id,
          quantidade,
        });
      }
      pedido.produtos = produtosDoPedido;
  
      const novoPedido = new Pedido(pedido);
      const resultado = await novoPedido.save();
      res.status(201).json(resultado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao criar o pedido' });
    }
  }
  
  

  async listarPedidos(req, res) {
    try {
      const pedidos = await Pedido.find();

      res.json(pedidos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao retornar a lista de pedidos' });
    }
  }

  async editarStatus(req, res) {
    try {
      const codigo = req.params.codigo;
      const { status } = req.body;
  
      const pedidoExistente = await Pedido.findOne({ codigo });
      if (!pedidoExistente) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }
  
      pedidoExistente.status = status;
      const pedidoAtualizado = await pedidoExistente.save();
  
      res.json(pedidoAtualizado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar o status do pedido' });
    }
  }
  
  
  

  async listarPedidoPorCliente(req, res) {
    try {
      const { codigoCliente } = req.params;
  
      const clienteExistente = await Cliente.findOne({ codigo: codigoCliente });
      if (!clienteExistente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
  
      const pedidosDoCliente = await Pedido.find({ cliente: clienteExistente._id });
  
      res.json(pedidosDoCliente);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao listar os pedidos do cliente' });
    }
  }

}

module.exports = new PedidoController();
