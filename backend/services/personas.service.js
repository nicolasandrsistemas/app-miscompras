import {Op} from 'sequelize';
import Persona from '../models/Persona.js';

const getAllPersonas = async (query) =>{
    try {
        const {orden, nombre, apellido} = query;

        // Orden (si no se especifica ninguno, será apellido)
        let campoOrden = orden || 'apellido';
        let expOrden = [[campoOrden, 'ASC']];

        // Filtros
        let filtroNombre = `%${nombre?nombre:''}%`;
        let filtroApellido = `%${apellido?apellido:''}%`;

        let expWhere = {
            nombre: {[Op.like]: filtroNombre},
            apellido: {[Op.like]: filtroApellido},
        };
        
        // Parámetros
        let parameters = {
            where: expWhere,
            order:expOrden
        }

        const personas = await Persona.findAll(parameters);
        return personas;
    } catch (error) {
        throw error;        
    }

}

const getPersona = async (id) => {
    try {
        const persona = await Persona.findByPk(id);
        return persona;        
    } catch (error) {
        throw error;                
    }
}

const createPersona = async (datosPersona)=>{
    try {
        const persona = await Persona.create(datosPersona);
        return persona;
    } catch (error) {
        throw error;                
    }
}

const updatePersona = async (id, datosPersona)=>{
    try {
        const persona = await Persona.findByPk(id);
        if (persona){
            Object.keys(datosPersona).forEach(key => {
                if (datosPersona[key] !== undefined) {
                    persona[key] = datosPersona[key];
                }
            });

            await persona.save();
            return persona;
        } else {
            throw new Error(`No se encuentra la persona`)
        }
    } catch (error) {
        throw error;                
    }    
}

const deletePersona = async (id)=>{
    try {
        const persona = await Persona.findByPk(id);
        if (persona){
            await persona.destroy()
        } else {
            throw new Error(`No se encuentra la persona`)
        }
    } catch (error) {
        throw error;                
    }    
}

export default {getAllPersonas, getPersona, createPersona, updatePersona, deletePersona}

