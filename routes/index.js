const express = require('express');
const router = express.Router();

// homepage route
router.get('/', ensureAuthenticated, (req, res)=>{
  res.render('index');
});



// this function is to tell node that if someone is NOT logged in, 
// redirect them to the login page. this is basically used to 
// ensure that a user if logged in otherwise
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next;
  } else {
    // this is optional you can show message if you want
    // req.flash('error_msg', 'Please login first to view the details');
    res.redirect('/logins/login')
  }
}


// exporting the router
module.exports = router;

