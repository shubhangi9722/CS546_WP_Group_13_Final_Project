const express = require('express');
const router = express.Router();
const userData = require('../data/admin');  // ./users.js
const bcrypt = require('bcryptjs');
const saltRounds = 10;  //the higher number, the longer time wil be 

router.get('/', async (req, res) => {
  try {
    if (req.session.isLogIn) {
      res.redirect('/private');
    } else {
      res.render('others/form', {title: "Login"});
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
})

router.post('/login', async (req, res) => {
  if (req.session.isLogIn) {
    res.redirect('/private');
  } else {
    res.status(401).render('others/form', {hasErrors: true, error: "You did not provide a valid username and/or password.", title: "Login"});
  }
})

router.get('/logout', async (req, res) => {
  res.clearCookie('AuthCookie');
  res.clearCookie('Build Session');
  req.session.destroy();
  res.send('You have logged out');
});

module.exports = router;