const { Router } = require("express");
const HistoricoEmprestimosController = require("../controllers/HistoricoEmprestimosController");

const router = Router();

router.post('/historico-emprestimos/', HistoricoEmprestimosController.registrarHistoricoEmprestimo);
router.get('/historico-emprestimos/', HistoricoEmprestimosController.selecionarTodosHistoricos);
router.get('/historico-emprestimos/:id', HistoricoEmprestimosController.selecionarHistoricoPeloId);
router.put('/historico-emprestimos/:id', HistoricoEmprestimosController.atualizarHistorico);
router.delete('/historico-emprestimos/:id', HistoricoEmprestimosController.deletarHistorico);


module.exports = router;