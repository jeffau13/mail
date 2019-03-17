const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const router = require('./routes/index')

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname,'public')));
app.use('/', router);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//Signup route
app.post

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Server listening on ${port}`));
