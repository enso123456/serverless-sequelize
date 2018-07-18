'use strict';

require('../database/db');
const fs = require('fs');
const Account = require('../database/schema/account');
const Customer = require('../database/schema/customer');

const readFile = (path, opts = 'utf8') => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, opts, (err, data) => {
      if (err) reject(err)
      else resolve(data);
    })
  })
}

module.exports.hello = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    // Account
    const accounts = await readFile('./account_info.csv')
    let accountsData = accounts.split('\n').map(val => val.split(','))
    accountsData.shift();
    accountsData.pop();

    accountsData = accountsData.map(async (val) => {
      const [id, deletion_indicator, business_partner_no, account_class] = val;
      const accountExist = await Account.count({ where: { 'id': id } });
      if (accountExist <= 0) {
        return await Account.create({
          deletion_indicator,
          business_partner_no,
          account_class,
        });
      }
    });

    let customers = await readFile('./customer_info.csv')
    let customersData = customers.split('\n').map(val => val.split(','))
    customersData.shift();
    customersData.pop();

    customersData.map(async val => {
      const [customer_id, bp_number, english_name] = val;
      console.log([customer_id, bp_number, english_name])
      const customerExist = await Customer.count({ where: { 'id': customer_id } });
      if (customerExist <= 0) {
        return await Customer.create({
          customer_id,
          bp_number,
          english_name,
          account_id: '1'
        });
      }
    });

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Created a account!',
      }),
    };
    callback(null, response);
  } catch (e) {
    callback(null, e);
  }
};

module.exports.getCustomerById = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    Customer.belongsTo(Account);

    const customer = await Customer.findAll({
      include: [{
        model: Account,
        where: {
          id: event.pathParameters.id
        }
      }]
    });

    console.log(await Customer.count({ where: { 'id': 1 }}));
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        customer
      }),
    };
    callback(null, response);
  } catch (e) {
    callback(null, e);
  }
}
