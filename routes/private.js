const express = require('express');
const router = express.Router();
const userData = require('../data/admin');  // ./users.js
const xss = require('xss');

router.get('/', async (req, res) => {
  // let aUserData = req.body;
  try {
    res.render('others/private', {
      Username: xss(req.session.user.username),
      First_Name: xss(req.session.user.firstname),
      Last_Name: xss(req.session.user.lastname),

      title: "private page",
      logoutLink: "http://localhost:3000/logout"
    });
  } catch (e) {
    res.status(403).render('pages/register', 
    {error: true, errorInfo: "You did not provide a valid username and/or password.", title: "Login"});
    }
  }
);

module.exports = router;
