import {Op} from 'sequelize';
import historicoService from '../services/historico.service.js';
import validateToken from '../middleware/validateToken.js';

const getAllHistoricos = async (req, res) => {
    try {
        const historicos = await historicoService.getAllHistoricos(req.query);
        res.send({status: "OK", data: historicos});
    } catch (error) {
        res.status(500).send ({status:"FAILED", data: {error: error?.message || error}})
        return;
    }
}

const getHistorico = async (req, res)=>{
    const id = req.params.id;
    if (!id || isNaN(id)){
        res.status(500).send ({status:"FAILED", data: {error: "Debe especificar un id numérico"}})
        return;

    }
    try {
        const historico = await historicoService.getHistorico(id);
        if (historico){
            res.send({status: "OK", data: historico});
        }
        else {
            res.status(404).send ({status:"FAILED", data: {error: "No se encontró el histórico"}})
        return;
        }

    }
    catch (error) {
        res.status(500).send ({status:"FAILED", data: {error: error?.message || error}})
        return;
    }
}

export default {getAllHistoricos, getHistorico}