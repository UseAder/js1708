var express = require('express');//脚手架
var path = require('path');//路径
var favicon = require('serve-favicon');//ico图标
var logger = require('morgan');//测试
var cookieParser = require('cookie-parser');//cookie解析
var bodyParser = require('body-parser');//post数据获取 相当于get数据获取req.query

//引入sessoin
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var comment = require('./routes/comment');

var app = express();

// view engine setup 视图 引擎 建立
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');//视图引擎为ejs格式 nodejs的引擎模块ejs jade 以及handlebars

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//静态资源设置在public目录

//session配置
app.use(session({
	secret:'recommend 128 bytes random string',
	cookie:{ maxAge:20 *  60 * 1000}, //毫秒为单位
	resave:true, //如果来了一个新的请求，不管原来在不在，重新存储一个
	saveUninitialized:true //存储一些未初始化的session
}));


app.use('/', index);//设置静态路由表
app.use('/users', users);
app.use('/comment', comment);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
