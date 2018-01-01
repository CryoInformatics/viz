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
  email: {
    type: Sequelize.STRING
  },
  translation: {
    type: Sequelize.STRING
  }
});
sequelize.authenticate().then(() => {
  console.log("Success!");
  //   Translations.sync({ force: true }).then(function () {
  //     return Translations.create({
  //       id: '0111',
  //       email: 'testemail@example.com',
  //       translation: 'despacito bitch'
  //     });
  //   });
  // }).catch((err) => {
  //   console.log(err);
});
module.exports = Translations;
//I know for sure that translations must be exported to index.js file 
//exporting Translations will give us access to the translations schema created in this file
