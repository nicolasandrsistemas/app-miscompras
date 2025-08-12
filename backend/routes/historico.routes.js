import { Router } from "express";
import {Op} from 'sequelize';
import historicoController from '../controllers/historico.controller.js';
import validateToken from "../middleware/validateToken.js";

const historicoRouter = new Router();

// ej: GET 
// historicoRouter.get('/', validateToken, historicoController.getAllHistoricos)
historicoRouter.get('/', historicoController.getAllHistoricos)

// Ej: GET /25
historicoRouter.get('/:id', historicoController.getHistorico)



export default historicoRouter;