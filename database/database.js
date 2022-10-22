const Sequelize = require("sequelize");

const conection = new Sequelize('guiaperguntas', 'teste', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = conection;