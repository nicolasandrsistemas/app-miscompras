// No importes este módulo desde tu app
// Tiene el único propósito de inicializar los datos 

import { Sequelize, DataTypes } from 'sequelize';
import fs from 'fs';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH || "./datos/datos.db",
});

// Model Productos
const Producto = sequelize.define('Producto', {
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
    tableName: 'productos', 
    timestamps: true
});

// Cargar productos desde JSON
const inicializarDesdeJSON = async (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const productos = JSON.parse(data);

        if (!Array.isArray(productos) || productos.length === 0) {
            throw new Error('Archivo JSON vacío o no válido.');
        }

        await sequelize.sync({ force: true });
        await Producto.bulkCreate(productos);
        console.log('Productos cargados.');
    } catch (error) {
        console.error('Error cargando productos:', error.message);
    } finally {
        await sequelize.close();
    }
};

export default {inicializarDesdeJSON}