const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://koyeb-adm:rlDEB2V7QCdX@ep-damp-wave-a22ezu5j.eu-central-1.pg.koyeb.app/todos', {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  }
});

const initModels = require('../models/init-models'); 
const models = initModels(sequelize);

module.exports = { models }