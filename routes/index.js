const bodyParser = require('body-parser');
const usuarios = require('./usuarios-route');

module.exports = app => {
    app.use(bodyParser.json(),
    usuarios,
    );
}