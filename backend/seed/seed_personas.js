// No importes este módulo desde tu app
// Tiene el único propósito de inicializar los datos 

import { Sequelize, DataTypes } from 'sequelize';
import fs from 'fs';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH || "./datos/datos.db",
});

// Model Persona
const Persona = sequelize.define('Persona', {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, { 
    tableName: 'personas', 
    timestamps: false 
}
);

// Cargar personas desde JSON
const inicializarDesdeJSON = async (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const personas = JSON.parse(data);

        if (!Array.isArray(personas) || personas.length === 0) {
            throw new Error('Archivo JSON vacío o no válido.');
        }

        await sequelize.sync({ force: true });
        await Persona.bulkCreate(personas);
        console.log('Personas cargadas.');
    } catch (error) {
        console.error('Error cargando personas:', error.message);
    } finally {
        await sequelize.close();
    }
};

export default {inicializarDesdeJSON}