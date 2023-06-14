require("./mongodb");
const mongoose = require("mongoose");
const clienteModel = require("../models/clienteModel");
const clientes = require("./clientes.json");

async function carregarDados() {
    try {
        await clienteModel.deleteMany({});
        for (const cliente of clientes) {
            await clienteModel.create(cliente);
        }
        console.log("Carga de clientes feita!");
    } catch (err) {
        console.log(err);
    } finally {
        process.exit();
    }
}

carregarDados();