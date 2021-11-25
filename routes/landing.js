const express = require('express');
const router = express.Router();
const userData = require('../data');
const bcrypt = require('bcryptjs');
const saltRounds = 10;


router.get('/', async (req, res) => {
    try {
      if(!req.session.user){
        res.render('user/login');
      }
      else{
        res.redirect('/private');
      }
    
    } catch (e) {
      res.status(500).send();
    }
  }); 
    
module.exports = router;