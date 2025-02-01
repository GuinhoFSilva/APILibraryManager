const database = require("../models");

class EmprestimosController {
    static async criarEmprestimo(req, res){
        const dados = req.body;
        const transacao = await database.sequelize.transaction();
        try{
            const create = await database.emprestimos.create(dados, {transaction: transacao});
            await database.historico_emprestimos.create({
                emprestimo_id: create.id,
                data_devolucao: dados.data_devolucao,
                status: dados.status,
            }, {transaction: transacao})
            await transacao.commit();
            return res.status(201).json(create);
        } catch (error) {
            await transacao.rollback();
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
                return res.status(404).send("Não foi possível encontrar um empréstimo com este id!")
            }
            return res.status(200).json(select);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async selecionarEmprestimosDoUsuario(req, res){
        const {usuario_id} = req.params;
        const {status} = req.query;
        try{
            const select = await database.emprestimos.findAll({
                include: [
                {
                    model: database.usuarios,
                    where: {id: Number(usuario_id)},
                    attributes: ['nome', 'data_nascimento']
                },
                {
                    model: database.livros,
                    attributes:['titulo']}
                ],
                where: status ? {status} : {},
                attributes: ['data_emprestimo', 'data_devolucao', 'status']
                });
                if(!select){
                    return res.status(404).send("Não foi possível encontrar um emprestimo de um usuário com este id!");
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
            const transacao = await database.sequelize.transaction();
            if(!select){
                return res.status(404).send("Não foi possível encontrar um empréstimo com este id!")
            }
            const statusPermitidos = ["pendente", "devolvido", "danificado"];
            if (!statusPermitidos.includes(novosDados.status)) {
                return res.status(400).send("Status inválido! Use apenas 'pendente', 'devolvido' ou 'danificado'");
            }
            await database.emprestimos.update(novosDados, {where: {id: Number(id)}}, {transaction: transacao});

            await database.historico_emprestimos.create({
                emprestimo_id: select.id,
                data_devolucao: novosDados.data_devolucao,
                status: novosDados.status,
                }, {transaction: transacao});

            await transacao.commit();
            return res.status(200).json({message: "Empréstimo atualizado com sucesso!", novosDados});
        } catch (error) {
            if(transacao) await transacao.rollback();
            return res.status(500).json(error.message);
        }
    }
    static async deletarEmprestimo(req, res){
        const {id} = req.params;
        try{
            const select = await database.emprestimos.findOne({where: {id: Number(id)}});
            if(!select){
                return res.status(404).send("Não foi possível encontrar um empréstimo com este id!")
            }
            if(select.status !== "devolvido"){
                return res.status(400).send("O livro não foi devolvido, não é possível deletar este empréstimo!");
            }
            await database.emprestimos.destroy({where: {id: Number(id)}});
            return res.status(200).send("Empréstimo deletado com sucesso!");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = EmprestimosController;