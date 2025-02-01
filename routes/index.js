const bodyParser = require('body-parser');
const usuarios = require('./usuarios-route');
const livros = require('./livros-route');
const emprestimos = require('./emprestimos-route');

module.exports = app => {
    app.use(bodyParser.json(),
    usuarios,
    livros,
    emprestimos
    );
}