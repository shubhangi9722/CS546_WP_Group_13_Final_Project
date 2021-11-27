const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
      if(!req.session.user)
      {
        res.render('customer/error')
      }
      else
      {
        res.render('sitter/sitterdashboard',{email:req.session.user.email});
      
      }
    } catch (e) {
      res.status(500).send();
    }
  }); 

module.exports = router;