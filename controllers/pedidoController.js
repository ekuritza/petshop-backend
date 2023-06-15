const Pedido = require('../models/pedidoModel');
const Produto = require('../models/produtoModel');
const Cliente = require('../models/clienteModel');

class PedidoController {
  async salvar(req, res) {
    try {
      const { codigo, preco, produtos, cliente, status } = req.body;

      const clienteExistente = await Cliente.findOne({ codigo: cliente });
      if (!clienteExistente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      const produtosDoPedido = [];
      for (const { produto, quantidade } of produtos) {
        const produtoExistente = await Produto.findOne({ codigo: produto });
        if (!produtoExistente) {
          return res.status(404).json({ error: `Produto ${produto} não encontrado` });
        }
        produtosDoPedido.push({
          produto: produtoExistente._id,
          quantidade
        });
      }

      const novoPedido = await Pedido.create({
        codigo,
        preco,
        produtos: produtosDoPedido,
        cliente: clienteExistente._id,
        status
      });

      res.status(201).json(novoPedido);
    } catch (error) {
      console.log(error);
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
      const { codigo, novoStatus } = req.body;
  
      const pedidoExistente = await Pedido.findOne({ codigo });
      if (!pedidoExistente) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }
  
      pedidoExistente.status = novoStatus;
      const pedidoAtualizado = await pedidoExistente.save();
  
      res.status(200).json(pedidoAtualizado.toObject());
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao editar o status do pedido' });
    }
  }
  

  async listarPedidoPorCliente(req, res) {
    try {
      const { clienteId } = req.params;

      const pedidos = await Pedido.find({ cliente: clienteId });

      res.json(pedidos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Erro ao retornar os pedidos do cliente' });
    }
  }

}

module.exports = new PedidoController();
