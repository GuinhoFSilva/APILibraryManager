const express = require("express");

const app = express()

const porta = 3333;

app.listen(porta, () => console.log("Servidor aberto na porta", porta));

module.exports = app;