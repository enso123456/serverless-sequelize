require('pg');
const Sequelize  = require('sequelize');

const POSTGRES_PASSWORD_KEY = "";
const POSTGRES_HOST = "localhost";
const POSTGRES_PORT = "5432";
const POSTGRES_DATABASE = "social";
const POSTGRES_USERNAME = "viseoromeo";
const Op = Sequelize.Op;
const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col
};

sequelize = new Sequelize(POSTGRES_DATABASE, POSTGRES_USERNAME,
    POSTGRES_PASSWORD_KEY,
    {
        host: POSTGRES_HOST,
        port: POSTGRES_PORT,
        dialect: 'postgres',
        operatorsAliases,
        logging: false,
        pool: {
            max: 1,
            min: 0,
            idle: 10000
        }
    });

module.exports = sequelize;

return sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    return Promise.resolve(sequelize);
}).catch((err) => {
    console.log('Unable to connect to the database', err);
    return Promise.reject(err);
});