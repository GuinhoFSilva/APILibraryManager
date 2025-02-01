const { Router } = require("express");
const LivrosController = require("../controllers/LivrosController");

const router = Router();

router.post('/livros/adicionar/:titulo', LivrosController.adicionarLivro);
router.get('/livros/', LivrosController.selecionarTodosLivros);
router.get('/livros/:id', LivrosController.selecionarLivroPorId);
router.put('/livros/:id', LivrosController.atualizarLivro);
router.delete('/livros/:id', LivrosController.deletarLivro);


module.exports = router;