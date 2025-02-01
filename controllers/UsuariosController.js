const database = require("../models");
const { Op } = require('sequelize');

class UsuariosController{
    static async criarUsuario(req, res){
        const dados = req.body;
        try{
            const emailExiste = await database.usuarios.findOne({where: {email: req.body.email}});
            if(emailExiste){
                return res.status(400).send("Já existe um usuário cadastrado com este email!");
            }
            const create = await database.usuarios.create(dados);
            return res.status(201).json(create);

        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async selecionarTodosUsuarios(req, res){
        try{
            const select = await database.usuarios.findAll();
            if(!select){
                return res.status(404).send("Não há nenhum usuário cadastrado no sistema!");
            }
            return res.status(200).json(select);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async selecionarUsuarioPeloId(req, res){
        const {id} = req.params
        try{
            const select = await database.usuarios.findOne({where: {id: Number(id)}});
            if(!select){
                return res.status(404).send("Não foi possível encontrar um usuário com este id!");
            }
            return res.status(200).json(select);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async atualizarUsuario(req, res){
        const {id} = req.params;
        const novosDados = req.body;
        try{
            const select = await database.usuarios.findOne({where: {id: Number(id)}});
            if(!select){
                return res.status(404).send("Não foi possível encontrar um usuário com este id!");
            }
            if(novosDados.email){
                const emailExiste = await database.usuarios.findOne({where: {email: req.body.email, id: {[Op.ne]:id}}});
                if(emailExiste){
                    return res.status(400).send("Não foi possível atualizar o email, pois já existe um usuário cadastrado com este email!");
                }
            }
            await database.usuarios.update(novosDados, {where: {id: Number(id)}});
            return res.status(200).json({message: "O usuário foi atualizado com sucesso!", usuario: novosDados})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async deletarUsuario(req, res){
        const {id} = req.params;
        try{
            const select = await database.usuarios.findOne({where: {id: Number(id)}});
            if(!select){
                return res.status(404).send("Não foi possível encontrar um usuário com este id!");
            }
            await database.usuarios.destroy({where: {id: Number(id)}});
            return res.status(200).send("Usuário foi deletado com sucesso!");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = UsuariosController;