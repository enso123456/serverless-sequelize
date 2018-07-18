const Sequelize = require('sequelize');
const sequelize = require('../db');

const schema = {
    bp_number: Sequelize.STRING,
    english_name: Sequelize.STRING,
    accountId: Sequelize.INTEGER,
};

const Model = sequelize.define('customer', schema);

Model.sync({ alter: true });

module.exports = Model;

