const { Router } = require("express");
const EmprestimosController = require("../controllers/EmprestimosController");

const router = Router();

router.post('/emprestimos/', EmprestimosController.criarEmprestimo);
router.get('/emprestimos/', EmprestimosController.selecionarTodosEmprestimos);
router.get('/emprestimos/:id', EmprestimosController.selecionarEmprestimoPeloId);
router.put('/emprestimos/:id', EmprestimosController.atualizarEmprestimo);
router.delete('/emprestimos/:id', EmprestimosController.deletarEmprestimo);


module.exports = router;