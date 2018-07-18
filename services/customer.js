'use strict';

require('../database/db');
const Profile = require('../database/schema/profile');
const Account = require('../database/schema/account');

module.exports.hello = async (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    try {
        const ProfileAccount = Account.belongsTo(Profile);

        const customer = await Account.create({
            username: 'johndoe',
            email: 'john@doe.com',
            password: 'abc12#!@#',
            profile: {
                first_name: 'John',
                last_name: 'Doe',
                age: 24,
            }
        }, {
                include: [ProfileAccount]
            })

        // findAll with association
        // const customer = await Account.findAll({
        //   include: [{
        //     model: Profile,
        //     where: {
        //       id: 3
        //     }
        //   }]
        // });

        const response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Created a account!',
                customer
            }),
        };
        // console.log(customer);
        callback(null, response);
    } catch (e) {
        console.log(e);
        callback(null, e);
    }
};


