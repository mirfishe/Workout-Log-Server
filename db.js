const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, 'postgres', process.env.DB_PASSWORD, {
    host:   'localhost',
    dialect:    'postgres'
});

sequelize.authenticate()
    .then(() => console.log('postgres db is connected.'))
    .catch(err => console.log(err));

module.exports = sequelize;