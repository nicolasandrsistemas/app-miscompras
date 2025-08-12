import {Op} from 'sequelize';
import Historico from '../models/Historico.js';

const getAllHistoricos = async (query) =>{
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


        const historicos = await Historico.findAll(parameters);
        return historicos;
    } catch (error) {
        throw error;        
    }

}

const getHistorico = async (id) => {
    try {
        const historico = await Historico.findByPk(id);
        return historico;        
    } catch (error) {
        throw error;                
    }
}

const createHistorico = async (datosHistorico)=>{
    try {
        const historico = await Historico.create(datosHistorico);
        return historico;
    } catch (error) {
        throw error;                
    }
}

export default {getAllHistoricos, getHistorico, createHistorico}

