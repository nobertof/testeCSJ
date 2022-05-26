const { default: axios } = require('axios');
const database = require('../models');
const retirar_acentos = require("../utils/retirarAcentos")
class LocaisReciclagem{
    static async pegarTodosOsPontos(req,res,next){
        try{
            const todosOsPontos = await database.LocaisReciclagem.findAll();
            for(let i=0; i<todosOsPontos.length;i++){
                const endereco = `
                ${todosOsPontos[i].logradouro ? `${retirar_acentos(todosOsPontos[i].logradouro)}` : ''}
                ${todosOsPontos[i].bairro ? `,${retirar_acentos(todosOsPontos[i].bairro)}` : ''}
                ${todosOsPontos[i].cidade ? `,${retirar_acentos(todosOsPontos[i].cidade)}` : ''}
                ${todosOsPontos[i].cep ? `,${retirar_acentos(todosOsPontos[i].cep)}` : ''}`
                const location = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${endereco}&key=AIzaSyCqodwG2Tqf8T7IvXLXzFz9ZH0SK7_oDKA`);
                todosOsPontos[i].dataValues.coordenadas = [location.data.results[0].geometry.location.lat,location.data.results[0].geometry.location.lng]
                console.log(todosOsPontos[i].dataValues.coordenadas)
                if(i == todosOsPontos.length-1){
                    console.log(todosOsPontos);
                    return res.status(200).json(todosOsPontos);
                }
            }   
        }catch(e){
            console.log(e)
            return res.status(400).json({erro:e.message});
        }
    }
    static async criarLocalDeReciclagem(req, res, next) {
        const novoLocal = req.body;
        try {
          const novoLocalCriado = await database.LocaisReciclagem.create(novoLocal);
          return res.status(201).json(novoLocalCriado);
        } catch (error) {
          return res.status(500).json(error.message);
        }
      }
      static async atualizarLocal(req, res, next) {
        const { id } = req.params;
        const novasInfos = req.body;
        try {
          await database.LocaisReciclagem.update(novasInfos, { where: { localReciclagem_id: Number(id) } });
          const localAtualizado = await database.LocaisReciclagem.findOne({
            where: { localReciclagem_id: Number(id) },
          });
          return res.status(200).json(localAtualizado);
        } catch (error) {
          return res.status(500).json(error.message);
        }
      }
      static async apagarPessoa(req, res, next) {
        const { id } = req.params;
        try {
          await database.LocaisReciclagem.destroy({ where: { localReciclagem_id: Number(id) } });
          return res
            .status(200)
            .json({ mensagem: `id ${id} deletado com sucesso!` });
        } catch (error) {
          return res.status(500).json(error.message);
        }
      }
}

module.exports = LocaisReciclagem;