import {Op} from 'sequelize';
import Persona from '../models/Persona.js';
import personasService from '../services/personas.service.js';
import validateToken from '../middleware/validateToken.js';

const getAllPersonas = async (req, res) => {
    try {
        const personas = await personasService.getAllPersonas(req.query);
        res.send({status: "OK", data: personas});
    } catch (error) {
        res.status(500).send ({status:"FAILED", data: {error: error?.message || error}})
        return;
    }
}

const getPersona = async (req, res)=>{
    const id = req.params.id;
    if (!id || isNaN(id)){
        res.status(500).send ({status:"FAILED", data: {error: "Debe especificar un id numérico"}})
        return;

    }
    try {
        const persona = await personasService.getPersona(id);
        if (persona){
            res.send({status: "OK", data: persona});
        }
        else {
            res.status(404).send ({status:"FAILED", data: {error: "No se encontró la persona"}})
        return;
        }

    }
    catch (error) {
        res.status(500).send ({status:"FAILED", data: {error: error?.message || error}})
        return;
    }
}

const createPersona = async(req, res)=>{
    const {body: datosPersona} = req;
    if (
        !datosPersona.nombre ||
        !datosPersona.apellido ||
        !datosPersona.edad
    ){
        res.status(500).send ({status:"FAILED", data: {error: "Debe proveer: nombre, apellido y edad"}})
        return;
    }
    else {
        try {
            const persona = await personasService.createPersona(datosPersona);
            res.status(201).send({status: "OK", data: persona});    
        } catch (error) {
            res.status(500).send ({status:"FAILED", data: {error: error?.message || error}})
            return;
        }
    }
}

const updatePersona = async(req, res)=>{
    const id = req.params.id;
    const {body: datosPersona} = req;
    if (!id || isNaN(id)){
        res.status(400).send ({status:"FAILED", data: {error: "Debe especificar un id numérico"}})
        return;
    }
    try {
        await personasService.updatePersona(id, datosPersona);
        res.status(200).send({status: "OK", data: 'Persona actualizada'});    
    }
    catch (error){
        res.status(500).send ({status:"FAILED", data: {error: error?.message || error}})
        return;
    }    
}

const deletePersona = async(req, res)=>{
    const id = req.params.id;
    if (!id || isNaN(id)){
        res.status(400).send ({status:"FAILED", data: {error: "Debe especificar un id numérico"}});
        return;
    }
    try {
        await personasService.deletePersona(id);
        res.status(200).send({status: "OK", data: 'Persona borrada'});    
    }
    catch (error) {
        res.status(500).send ({status:"FAILED", data: {error: error?.message || error}});
        return;
    }    
}

export default {getAllPersonas, getPersona, createPersona, updatePersona, deletePersona}