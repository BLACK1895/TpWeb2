const {sequaliza} = require(sequelize);
require('dotenv').config();

const sequalize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  logging: false, // Desactiva el logging de consultas SQL
});