const database = require("../models");
const axios = require('axios');

class LivrosController{
    static async adicionarLivro(req, res){
        const titulo = req.params.titulo;
        console.log(titulo);
        try{
            const resposta = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
                params: {
                    q: `intitle:${titulo}`,
                    projection: 'full',
                    maxResults: 1,
                }
            });
            if(!resposta.data.items || resposta.data.items.length === 0){
                return res.status(404).send("Nenhum livro encontrado");
            } else {
                const livro = resposta.data.items[0].volumeInfo;
                console.log(resposta.data.items[0]);
                const dadosLivro = {
                    titulo: livro.title,
                    autor: livro.authors[0],
                    descricao: livro.description || "Descrição não disponível",
                    data_publicacao: livro.publishedDate,
                    isbn: livro.industryIdentifiers ? livro.industryIdentifiers.find(id => id.type === "ISBN_13")?.identifier : null,
                    link_googlebooks: livro.previewLink,
                    data_adicao: new Date()
                }
                const novoLivro = await database.livros.create(dadosLivro);
                return res.status(201).json(novoLivro);
            }
        } catch (error) {
            return res.status(500).json(error.message);
        }   
    }
    static async selecionarTodosLivros(req, res){
        try{
            const select = await database.livros.findAll();
            if(!select){
                return res.status(200).send("Nenhum há livro cadastrado no sistema!");
            }
            return res.status(200).json(select);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async selecionarLivroPeloId(req, res){
        const {id} = req.params;
        try{
            const select = await database.livros.findOne({where: {id: Number(id)}});
            if(!select){
                return res.status(404).send("Não foi possível encontrar um livro com este id!");
            }
            return res.status(200).json(select);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async atualizarLivro(req, res){
        const {id} = req.params;
        const novosDados = req.body;
        try{
            const select = await database.livros.findOne({where: {id: Number(id)}});
            if(!select){
                return res.status(404).send("Não foi possível encontrar um livro com este id!");
            }
            await database.livros.update(novosDados, {where: {id: Number(id)}});
            return res.status(200).json({message: "Os dados do livro foram atualizados com sucesso!", novosDados})
        } catch (error){
            return res.status(500).json(error.message)
        }
    }
    static async deletarLivro(req, res){
        const {id} = req.params;
        try{
            const select = await database.livros.findOne({where: {id: Number(id)}});
            if(!select){
                return res.status(404).send("Não foi possível encontrar um livro com este id!");
            }
            await database.livros.destroy({where: {id: Number(id)}});
            return res.status(200).send("Livro deletado com sucesso!");
        } catch (error) {

        }
    }

}

module.exports = LivrosController;