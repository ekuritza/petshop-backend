require('./database/mongodb');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

var index = require('./routes/index');
var clienteRouter = require('./routes/clienteRouter');
var categoriaRouter = require('./routes/categoriaRouter');
var produtoRouter = require('./routes/produtoRouter');
var pedidoRouter = require('./routes/pedidoRouter');
var loginRouter = require('./routes/loginRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', index);
app.use('/cliente', clienteRouter);
app.use('/categoria', categoriaRouter);
app.use('/produto', produtoRouter);
app.use('/pedido', pedidoRouter);
app.use('/login', loginRouter);

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

module.exports = app;
