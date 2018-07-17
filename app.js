const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');

// creating the mongo database
mongoose.connect('mongodb://localhost/manskybase');

// creating the database mongoose connections
const db = mongoose.connection;

// initiating the port number
const port = process.env.PORT || 3000;

// creating the routes for the js files
const routes = require('./routes/index');
const users = require('./routes/users');

// intiating the app
const app = express();

// View Engines
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// express sessions middleware
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}))

// passport initialization
    // must be placed after the express session middleware
app.use(passport.initialize());
app.use(passport.session())


// express middleware validator
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// connect flash middleware
app.use(flash());

// Global varriables for the flash messaging
app.use((req, res, next)=>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  // in this part, we are using errors because
  // passportjs automatically sets the error messages into { error }
  // so we have to use the key word 'error'
  res.locals.error = req.flash('error');
  next();
})

// using routes for the express app
app.use('/', routes);
app.use('/users', users);

// setting the server open
app.listen(port, ()=>{
  console.log(`server is open at ${port}`)
})


