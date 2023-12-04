const { Sequelize } = require('sequelize');
class MySequelize extends Sequelize {
    constructor(config) {
        super(config.database, config.user, config.password, config.options);
    }
}

const createMySequelize = (config) => {
    return new MySequelize(config)
}

module.exports = createMySequelize;