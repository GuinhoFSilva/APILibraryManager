const database = require("../models");

class EmprestimosController {
    static async criarEmprestimo(req, res){
        const dados = req.body;
        try{
            const create = await database.emprestimos.create(dados);
            return res.status(201).json(create);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async selecionarTodosEmprestimos(req, res){
        try{
            const select = await database.emprestimos.findAll();
            if(select.length === 0){
                return res.status(200).send("Não há nenhum empréstimo cadastrado no sistema!")
            }
            return res.status(200).json(select);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async selecionarEmprestimoPeloId(req, res){
        const {id} = req.params;
        try{
            const select = await database.emprestimos.findOne({where: {id: Number(id)}});
            if(!select){
                return res.status(404).send("Não há nenhum empréstimo cadastrado no sistema!")
            }
            return res.status(200).json(select);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async atualizarEmprestimo(req, res){
        const {id} = req.params;
        const novosDados = req.body;
        try{
            const select = await database.emprestimos.findOne({where: {id: Number(id)}});
            if(!select){
                return res.status(404).send("Não há nenhum empréstimo cadastrado no sistema!")
            }
            await database.emprestimos.update(novosDados, {where: {id: Number(id)}});
            return res.status(200).json({message: "Empréstimo atualizado com sucesso!", novosDados});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async deletarEmprestimo(req, res){
        const {id} = req.params;
        try{
            const select = await database.emprestimos.findOne({where: {id: Number(id)}});
            if(!select){
                return res.status(404).send("Não há nenhum empréstimo cadastrado no sistema!")
            }
            await database.emprestimos.destroy({where: {id: Number(id)}});
            return res.status(200).send("Empréstimo deletado com sucesso!");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = EmprestimosController;