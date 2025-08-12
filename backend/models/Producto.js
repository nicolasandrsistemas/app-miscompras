import { DataTypes } from "sequelize";
import sequelize from "../db.js";

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
        type: DataTypes.STRING,
        allowNull: true,
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
}, {
    tableName: 'productos',
    timestamps: true
}
);

export default Producto;