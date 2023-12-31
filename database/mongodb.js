const mongoose = require('mongoose');
const URL = 'mongodb://0.0.0.0:27017/petshop';
const db = mongoose.connect(URL);
const teste = mongoose.connection;

teste.on('open', function () {
  console.log('Conectado ao MongoDB!');
});

teste.on('error', function () {
  console.log('Erro na conexão com o MongoDB!');
});

teste.on('close', function () {
  console.log('Desconetado do MongoDB!');
});

module.exports = db;