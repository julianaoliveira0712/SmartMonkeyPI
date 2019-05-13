const express = require('express');
const indexRouter = require('./routes/index');
const middlewares = require('./middlewares');
const cadastroRouter = require('./routes/cadastro')
const app = express();

app.set('views', middlewares.path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// middlewares
app.use(express.json()); // permitindo JSON no Server
app.use(express.urlencoded({ extended: false }));
 // Informando o caminho dos arquivos estáticos do servidor(image, videos, css e etc...), que no caso é a pasta public
app.use(express.static(middlewares.path.join(__dirname, 'public')));
app.use(middlewares.cookieParser());
app.use(middlewares.logger('dev'));
app.use('/', indexRouter);
app.use('/cadastro', cadastroRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
