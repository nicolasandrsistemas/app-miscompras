import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: process.env.DB_PATH || "./datos/datos.db"
});

export default sequelize;