const { Router } = require("express");
const UsuariosController = require("../controllers/UsuariosController");

const router = Router();

router.post('/usuarios', UsuariosController.criarUsuario);
router.get('/usuarios', UsuariosController.selecionarTodosUsuarios);
router.get('/usuarios/:id', UsuariosController.selecionarUsuarioPeloId);
router.put('/usuarios/:id', UsuariosController.atualizarUsuario);
router.delete('/usuarios/:id', UsuariosController.deletarUsuario);

module.exports = router;