const Sequelize = require('sequelize');
const sequelize = require('../db');

const schema = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    deletion_indicator: Sequelize.STRING,
    business_partner_no: Sequelize.STRING,
    account_class: Sequelize.STRING,
};

const Model = sequelize.define('account', schema);

Model.sync({ alter: true });

module.exports = Model;
