const Sequelize = require('sequelize');
const sequelize = require('../db');

const schema = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    customer_id: Sequelize.STRING,
    bp_number: Sequelize.STRING,
    english_name: Sequelize.STRING,
    account_id: Sequelize.STRING,
};

const Model = sequelize.define('customer', schema);

Model.sync({ alter: true });

module.exports = Model;

