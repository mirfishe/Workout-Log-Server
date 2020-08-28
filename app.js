require('dotenv').config();

const express = require('express');
const app = express();
const sequelize = require('./db');

const user = require('./controllers/user-controller');
const logs = require('./controllers/log-controller');

sequelize.sync();

app.use(express.json());

app.use(require('./middleware/headers'));


app.use('/user', user);

app.use('/log', logs);

app.listen(process.env.PORT, function() { 
  console.log(`App is listening on port ${process.env.PORT}`);
}
);
