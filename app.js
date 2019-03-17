const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname,'public')));


const port = process.env.PORT || 3000;
app.listen(port, console.log(`Server listening on ${port}`));
