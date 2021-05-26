const express = require('express');
const path = require('path');
const debug = require('debug')('app');
const chalk = require('chalk');
const sql = require('mssql/msnodesqlv8');
const cors = require('cors');
const routes = require('./routes')();

//SQLServer Connection
const config = {
  driver: 'msnodesqlv8',
  server: 'NITINDHAKAD\\SQLEXPRESS',
  database: 'BlogPostAppLike',
  options: {
    trustedConnection: true,
  },
};

sql.connect(config, (err) => {
  if (err) debug(chalk.Red(err));
});


const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/css', express.static(path.join(__dirname, '../../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../../node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '../../node_modules/jquery/dist')));
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use('/',routes);


app.listen(3000, () => {
  debug(`listening on port ${chalk.green(3000)}`);
})

