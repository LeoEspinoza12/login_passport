const express = require('express');
const router = express.Router();

// require the User model from the users folder
const User = require('../models/user')

// register route
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  // passing the values into the variables
  let name = req.body.name;
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let password2 = req.body.password2;

  // form validation
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Password is required').equals(req.body.password);

  // instantiating errors for validation
  let errors = req.validationErrors();

  if(errors){
    // sending error to the page
    res.render('register', { errors: errors })
  } else {
    // pass the value of the request to the 
    // userSchema
    var newUser = new User({
      name: name,
      username: username,
      email: email,
      password: password
    })
    
    // save the newUser to the database
    // this function came the Users model
    User.createUser(newUser, (err, user)=>{
      if(err) throw err;
      console.log(user);
    });
    
    req.flash('success_msg', 'You are now registered');
    res.redirect('/login/login');
    // res.render('register', {text: 'user is registered'})
  }
});








// exporting the router
module.exports = router;
