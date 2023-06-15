const produtoModel = require('../models/produtoModel');
const categoriaModel = require('../models/categoriaModel');
const { ObjectId } = require('mongoose').Types;

class ProdutoController {
    async salvar(req, res) {
        try {
          const produto = req.body;
          const max = await produtoModel.findOne({}).sort({ codigo: -1 });
          produto.codigo = max == null ? 1 : max.codigo + 1;

          const categoria = await categoriaModel.findOne({});
          if (!categoria) {
            return res.status(404).json({ error: 'Nenhuma categoria encontrada no seu banco de dados' });
          }
          produto.categoria = categoria._id;
      
          const produtoNovo = await produtoModel.create(produto);
          res.status(201).json(produtoNovo);
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'Erro ao cadastrar o produto' });
        }
      }  

      async listarProdutos(req, res) {
        try {
          const produtos = await produtoModel.find();
          res.status(200).json(produtos);
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'Erro ao retornar a lista de produtos' });
        }
      }

      async buscarProdutoPorCodigo(req, res) {
        try {
          const codigo = req.params.codigo;
          const produto = await produtoModel.findOne({ codigo: codigo });
          if (!produto) {
            console.log('Produto não encontrado');
            res.status(404).json({ message: 'Produto não encontrado' });
          } else {
            res.status(200).json(produto);
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'Erro ao retornar o produto' });
        }
      }

      async atualizarProduto(req, res) {
        try {
          const codigo = req.params.codigo;
          const novoProduto = req.body;
      
          if (novoProduto.categoria && typeof novoProduto.categoria === 'number') {
            novoProduto.categoria = new ObjectId(novoProduto.categoria);
          }
    
          const produtoAtualizado = await produtoModel.findOneAndUpdate({ codigo: codigo }, novoProduto,{ new: true });
      
          if (produtoAtualizado) {
            res.status(200).json(produtoAtualizado);
          } else {
            res.status(404).json({ error: 'Produto não encontrado' });
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'Erro ao atualizar o produto' });
        }
      }
      
      


}

module.exports = new ProdutoController();