// No importes este módulo desde tu app
// Tiene el único propósito de inicializar los datos 

import { Sequelize, DataTypes } from 'sequelize';
import fs from 'fs';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH || "./datos/datos.db",
});

// Model Historico
const historico = sequelize.define('Historico', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    producto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
}, { 
    tableName: 'historico', 
    timestamps: true
});

// Cargar historicos desde JSON
const inicializarDesdeJSON = async (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const historicos = JSON.parse(data);

        if (!Array.isArray(historicos) || historicos.length === 0) {
            throw new Error('Archivo JSON vacío o no válido.');
        }

        await sequelize.sync({ force: true });
        await historico.bulkCreate(historicos);
        console.log('Historicos cargados.');
    } catch (error) {
        console.error('Error cargando historicos:', error.message);
    } finally {
        await sequelize.close();
    }
};

export default {inicializarDesdeJSON}