require('dotenv').config();

// console.log(process.env.PORT);

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var debug = require('debug')('restaurant:server');
const mongoose = require('mongoose');
const body_parser = require("body-parser");

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL,
    { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("DB connected established"))
    .catch(err => console.log("DB connection error: ", err));

var itemRouter = require('./routes/item');
var extraServiceRouter = require('./routes/extraService');
var usersRouter = require('./routes/users');
var hallRouter = require('./routes/hall');
var reservationRouter = require('./routes/reservation');
var reservationShowRouter = require('./routes/reservationShow');
var reportRouter = require('./routes/report');
var dashboardRouter = require('./routes/dashboard');
var waiterReportRouter = require('./routes/waiterReport');
var waiterReportRouter1 = require('./routes/waiterReport1');
var paymentReportRouter = require('./routes/paymentReport');

var app = express();
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/dashboard', dashboardRouter);
app.use('/paymentReport', paymentReportRouter);
app.use('/waiterReport', waiterReportRouter);
app.use('/waiterReport1', waiterReportRouter1);
app.use('/report', reportRouter);
app.use('/reservationShow', reservationShowRouter);
app.use('/extraService', extraServiceRouter);
app.use('/item', itemRouter);
app.use('/users', usersRouter);
app.use('/hall', hallRouter);
app.use('/', reservationRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

module.exports = app;
