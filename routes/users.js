const express = require('express');
const router = express.Router();

// register route
router.get('/register', (req, res) => {
  res.render('register');
});

// login route
router.get('/login', (req, res) => {
  res.render('login');
});


// exporting the router
module.exports = router;
