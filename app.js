const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const db  = require('./src/database');

var bodyParser = require('body-parser')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var routes = require('./routes/routes');

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', routes);

app.listen(port, err => {
  console.log(`Server is listening on ${port}`);
});