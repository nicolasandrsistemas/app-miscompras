import { Router } from "express";
import {Op} from 'sequelize';
import productosController from '../controllers/productos.controller.js';
import validateToken from "../middleware/validateToken.js";

const productosRouter = new Router();

// ej: GET 
// productosRouter.get('/', validateToken, productosController.getAllProductos)
productosRouter.get('/', productosController.getAllProductos)

// Ej: GET /25
productosRouter.get('/:id', productosController.getProducto)

// POST 
productosRouter.post('/', productosController.createProducto)

// PUT 
productosRouter.put('/:id', productosController.updateProducto)

// DELETE
productosRouter.delete('/:id', productosController.deleteProducto)

export default productosRouter;