import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Historico = sequelize.define('Historico', {
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
    tableName: 'historico',
    timestamps: true
}
);

export default Historico;