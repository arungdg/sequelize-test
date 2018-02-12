import Sequelize from 'sequelize';
import log from '../config/log4js.config'

var sequelize = new Sequelize('database', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    logging: false,
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 10000,
        handleDisconnects: true,
        evict: 60000,
        connectRetries: 5,
        operatorsAliases: false
    }
});

sequelize = sequelize;

/**
 * connection test
 */
sequelize
    .authenticate()
    .then(() => {
        log.info('Connection has been established successfully.');
    })
    .catch(err => {
        log.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;