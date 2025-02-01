const express = require("express");
const routes = require("./routes");

const app = express()

routes(app);

const porta = 3333;

app.listen(porta, () => console.log("Servidor aberto na porta", porta));

module.exports = app;