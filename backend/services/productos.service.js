import {Op} from 'sequelize';
import Producto from '../models/Producto.js';

const getAllProductos = async (query) =>{
    try {
        const {categoria, producto,orden} = query;

        // Orden (si no se especifica ninguno, será producto)
        //let campoOrden = orden || 'producto';
        //let expOrden = [[campoOrden, 'ASC']];

        // Filtros
        let filtroProducto = `%${producto?producto:''}%`;
        let filtroCategoria = categoria ? categoria: '';

        let expWhere = {
            producto: {[Op.like]: filtroProducto},
        };
        // Solo filtra por categoría si viene en la query
        if (filtroCategoria) {
            expWhere.categoria = filtroCategoria;
        }
        // Ordenar por fecha de creación descendente si se pide
        let expOrder = [];
        if (orden === 'id') {
            expOrder = [['id', 'DESC']];
        }

        let parameters = {
            where: expWhere,
            order: expOrder.length ? expOrder : undefined,
        };


        const productos = await Producto.findAll(parameters);
        return productos;
    } catch (error) {
        throw error;        
    }

}

const getProducto = async (id) => {
    try {
        const producto = await Producto.findByPk(id);
        return producto;        
    } catch (error) {
        throw error;                
    }
}

const createProducto = async (datosProducto) => {
    try {
        const existente = await Producto.findOne({ where: { producto: datosProducto.producto } });
        if (existente) {
            existente.cantidad = Number(existente.cantidad) + Number(datosProducto.cantidad);
            await existente.save();
            // Vuelve a consultar el producto actualizado
            const actualizado = await Producto.findByPk(existente.id);
            return actualizado;
        } else {
            const producto = await Producto.create(datosProducto);
            return producto;
        }
    } catch (error) {
        throw error;
    }
}

const updateProducto = async (id, datosProducto)=>{
    try {
        const producto = await Producto.findByPk(id);
        if (producto){
            Object.keys(datosProducto).forEach(key => {
                if (datosProducto[key] !== undefined) {
                    producto[key] = datosProducto[key];
                }
            });

            await producto.save();
            return producto;
        } else {
            throw new Error(`No se encuentra el producto`)
        }
    } catch (error) {
        throw error;                
    }    
}

const deleteProducto = async (id)=>{
    try {
        const producto = await Producto.findByPk(id);
        if (producto){
            await producto.destroy()
        } else {
            throw new Error(`No se encuentra el producto`)
        }
    } catch (error) {
        throw error;                
    }    
}

export default {getAllProductos, getProducto, createProducto, updateProducto, deleteProducto}

