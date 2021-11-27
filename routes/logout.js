const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
      req.session.destroy();
      res.render('landing/logout');
    } catch (e) {
      res.status(500).send();
    }
  }); 

  module.exports = router;
    