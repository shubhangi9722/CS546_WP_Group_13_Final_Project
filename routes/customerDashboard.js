const express = require('express');
const router = express.Router();
const data = require('../data');
const CustomerData = data.customer;

router.get('/', async (req, res) => {
    try {
      if(!req.session.user)
      {
        res.render('customer/error')
      }
      else
      {
        res.render('customer/customerdashboard',{email:req.session.user.email});
      
      }
    } catch (e) {
      res.status(500).send();
    }
  }); 

  
router.get('/getsitterfordashboard', async (req, res) => {
  try {

    const SitterData = await CustomerData.getsitterDataforDashboard();

    return res.json(SitterData);
  } catch (e) {
    res.status(500).send();
  }
}); 

  
router.get('/getCustomerDetails/:email', async (req, res) => {
  if(!req.params.email)
  {
    res.status(400).json({ error: 'You must provide email' });
    return;
  }
  try {

    const CustomerProfile = await CustomerData.getCuerrntCustomerInfo(req.params.email);

    return res.json(CustomerProfile);
  } catch (e) {
    res.status(500).send();
  }
}); 

module.exports = router;