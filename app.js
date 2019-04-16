const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const router = require('./routes/index');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('failed');
});

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Server listening on ${port}`));
