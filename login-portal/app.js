var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session');
const dashboardRouter = require("./routes/dashboard");         
const publicRouter = require("./routes/public");
var okta=require('@okta/okta-sdk-nodejs');
var ExpressOIDC=require("@okta/oidc-middleware").ExpressOIDC;

var app = express();
var oktaClient = new okta.Client({
  orgUrl: 'student-dev-406160',
  token: '00ERLVHvYQAy8YUzK1tCVGK1ABGchcdBZ_EHJuoYCv'
});
const oidc = new ExpressOIDC({
  issuer: "student-dev-406160/oauth2/default",
  client_id: 0oapx9jk5YYXdHH2u356,
  client_secret: i7kPLSXdKXkth7L7WhH8XNdF3dg4kkmu8oDlKb2M,
  redirect_uri: 'http://localhost:3000/users/callback',
  scope: "openid profile",
  routes: {
    login: {
      path: "/users/login"
    },
    callback: {
      path: "/users/callback",
      defaultRedirect: "/dashboard"
    }
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'susieandteddyrcute',
  resave: true,
  saveUninitialized: false
}));
app.use('/', publicRouter);
app.use('/users', dashboardRouter);

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
