import { DataTypes } from "sequelize";
import sequelize from '../db.js';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        len: [5, 30],
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        len: [5, 60],
        isEmail: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }

})

export default User