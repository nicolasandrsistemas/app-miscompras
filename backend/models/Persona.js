import { DataTypes } from "sequelize";
import sequelize from "../db.js";

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

export default Persona;