const { Router } = require("express");
const UsuariosController = require("../controllers/UsuariosController");

const router = Router();

router.post('/usuarios', UsuariosController.criarUsuario);
router.get('/usuarios', UsuariosController.selecionarTodosUsuarios);
router.get('/usuario/:id', UsuariosController.selecionarUsuarioPeloId);
router.put('/usuario/:id', UsuariosController.atualizarUsuario);
router.delete('/usuario/:id', UsuariosController.deletarUsuario);

module.exports = router;