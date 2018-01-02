const Sequelize = require('sequelize');
const sequelize = new Sequelize('rvuugvij', 'rvuugvij', 'lxhGCxsqDWZRA8GueC27mR3ayRq-Jmdb', {
  host: 'baasu.db.elephantsql.com',
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  },
});
var Translations = sequelize.define('translations', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  translation: {
    type: Sequelize.STRING
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: 'users',
    referencesKey: 'id'
  }
});
var Users = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING
  },
  profile_name: {
    type: Sequelize.STRING
  }
});

Users.hasMany(Translations)

sequelize.authenticate();

module.exports = Translations;
module.exports = Users;
