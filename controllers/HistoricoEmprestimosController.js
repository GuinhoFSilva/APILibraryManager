const database = require("../models");

class HistoricoEmprestimosController {
    static async registrarHistoricoEmprestimo(req, res){
        const dados = req.body;
        try{
            const create = await database.historico_emprestimos.create(dados);
            return res.status(201).json(create);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async selecionarTodosHistoricos(req, res){
        try{
            const select = await database.historico_emprestimos.findAll();
            if(select.length === 0){
                return res.status(200).send("Não há nenhum histórico de empréstimos cadastrado");
            }
            return res.status(200).json(select);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async selecionarHistoricoPeloId(req, res){
        const {id} = req.params;
        try{
            const select = await database.historico_emprestimos.findOne({where:{id: Number(id)}});
            if(!select){
                return res.status(404).send("Não foi possível encontrar um histórico com este id!");
            }
            return res.status(200).json(select);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async atualizarHistorico(req, res){
        const {id} = req.params;
        const novosDados = req.body;
        try{
            const select = await database.historico_emprestimos.findOne({where:{id: Number(id)}});
            if(!select){
                return res.status(404).send("Não foi possível encontrar um histórico com este id!");
            }
            await database.historico_emprestimos.update(novosDados, {where: {id: Number(id)}});
            return res.status(200).json({message: "Histórico atualizado com sucesso!", novosDados});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async deletarHistorico(req, res){
        const {id} = req.params;
        try{
            const select = await database.historico_emprestimos.findOne({where:{id: Number(id)}});
            if(!select){
                return res.status(404).send("Não foi possível encontrar um histórico com este id!");
            }
            await database.historico_emprestimos.destroy({where: {id: Number(id)}});
            return res.status(201).send("Histórico deletado com sucesso!");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = HistoricoEmprestimosController;