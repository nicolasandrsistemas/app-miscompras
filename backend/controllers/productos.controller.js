import {Op} from 'sequelize';
import Producto from '../models/Producto.js';
import productosService from '../services/productos.service.js';
import historicoService from '../services/historico.service.js';
import validateToken from '../middleware/validateToken.js';

const getAllProductos = async (req, res) => {
    try {
        const productos = await productosService.getAllProductos(req.query);
        res.send({status: "OK", data: productos});
    } catch (error) {
        res.status(500).send ({status:"FAILED", data: {error: error?.message || error}})
        return;
    }
}

const getProducto = async (req, res)=>{
    const id = req.params.id;
    if (!id || isNaN(id)){
        res.status(500).send ({status:"FAILED", data: {error: "Debe especificar un id numérico"}})
        return;

    }
    try {
        const producto = await productosService.getProducto(id);
        if (producto){
            res.send({status: "OK", data: producto});
        }
        else {
            res.status(404).send ({status:"FAILED", data: {error: "No se encontró el producto"}})
        return;
        }

    }
    catch (error) {
        res.status(500).send ({status:"FAILED", data: {error: error?.message || error}})
        return;
    }
}

const createProducto = async (req, res) => {
    const { body: datosProducto } = req;
    if (
        !datosProducto.producto ||
        !datosProducto.categoria ||
        !datosProducto.cantidad ||
        !datosProducto.precio
    ) {
        res.status(500).send({
            status: "FAILED",
            data: { error: "Debe proveer: nombre Producto,categoria , cantidad y precio" }
        });
        return;
    } else {
        try {
            // Guardar el producto en la tabla principal
            const producto = await productosService.createProducto(datosProducto);

            // Guardar en la tabla histórico (puedes usar un servicio aparte)
            await historicoService.createHistorico({
                productoId: producto.id, // referencia al producto recién creado
                producto: datosProducto.producto,
                categoria: datosProducto.categoria,
                cantidad: datosProducto.cantidad,
                precio: datosProducto.precio
            });

            res.status(201).send({ status: "OK", data: producto });
        } catch (error) {
            res.status(500).send({
                status: "FAILED",
                data: { error: error?.message || error }
            });
            return;
        }
    }
}

const updateProducto = async(req, res)=>{
    const id = req.params.id;
    const {body: datosProducto} = req;
    if (!id || isNaN(id)){
        res.status(400).send ({status:"FAILED", data: {error: "Debe especificar un id numérico"}})
        return;
    }
    try {
        await productosService.updateProducto(id, datosProducto);
        res.status(200).send({status: "OK", data: 'Producto actualizado'});    
    }
    catch (error){
        res.status(500).send ({status:"FAILED", data: {error: error?.message || error}})
        return;
    }    
}

const deleteProducto = async(req, res)=>{
    const id = req.params.id;
    if (!id || isNaN(id)){
        res.status(400).send ({status:"FAILED", data: {error: "Debe especificar un id numérico"}});
        return;
    }
    try {
        await productosService.deleteProducto(id);
        res.status(200).send({status: "OK", data: 'Producto borrado'});    
    }
    catch (error) {
        res.status(500).send ({status:"FAILED", data: {error: error?.message || error}});
        return;
    }    
}

export default {getAllProductos, getProducto, createProducto, updateProducto, deleteProducto}