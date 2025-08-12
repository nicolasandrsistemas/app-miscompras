import { Router } from "express";
import {Op} from 'sequelize';
import Persona from '../models/Persona.js';
import personasController from '../controllers/personas.controller.js';
import validateToken from "../middleware/validateToken.js";

const personasRouter = new Router();

// ej: GET 
// personasRouter.get('/', validateToken, personasController.getAllPersonas)
personasRouter.get('/', personasController.getAllPersonas)

// Ej: GET /25
personasRouter.get('/:id', personasController.getPersona)

// POST 
personasRouter.post('/', personasController.createPersona)

// PUT 
personasRouter.put('/:id', personasController.updatePersona)

// DELETE
personasRouter.delete('/:id', personasController.deletePersona)

export default personasRouter;