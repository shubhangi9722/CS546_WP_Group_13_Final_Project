const express = require('express');
const router = express.Router();
const data = require('../data');
const customerData= data.customer;
const xss = require('xss');

router.get('/', async (req, res) => {
    try {
      if(!req.session.user){
        res.render('customer/login');
      }
      else{
        res.redirect('/customerDashboard');
      }
    
    } catch (e) {
      res.status(500).send();
    }
  }); 
    

  
  ////////////////////////////////////////////

  router.post('/', async (req, res) => {
    const rest_params=req.body;
   
    let errors =[];
    if(!rest_params.email)
    {
    errors.push('You must provide email name' );

    }
  
    if(!rest_params.password)
    {
    errors.push('You must provide password' );

    }
   
  
    if(typeof rest_params.email!=='string')
      {
      errors.push('email must be sting' );

      }
      if(typeof rest_params.password!=='string')
      {
      errors.push('password must be sting');

      }
      
    if(rest_params.email.trim()==='')
    {
    errors.push('email cannot be empty string' );

    }
    if(rest_params.password.trim()==='')
    {
    errors.push('password cannot be empty string' );
    }
      
    var emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!rest_params.email.valueOf().match(emailRegex)) {
    errors.push(
      "e-mail format is incorrect"
    );
  }

  var passRegex = /^[a-zA-Z0-9\-_]{6,40}$/;
  if(!rest_params.password.valueOf().match(passRegex))
  {
    errors.push('passwor cannot have spaces,only alphanumeric characters and minimum of 6 characters long.')
  }

  if (errors.length > 0) {
    res.statusCode = 400;
    res.render('customer/login', {
      email: xss(rest_params.email),
      password: xss(rest_params.password),
      error:errors,
      hasErrors:true,
    

    });
   return  
 }
    
      try {

        
        const{email, password}=rest_params
        const rest = await customerData.checkCustomer(email, password);
        if(rest.authenticated===true)
        {
        req.session.user = { email: xss(email), usertype:'customer'};
        return  res.redirect('/customerDashboard');
        }
      } catch (error) {
          res.statusCode = 400;
          res.render('customer/login', {
          email: xss(rest_params.email),
          password: xss(rest_params.password),  
          error:error,
          hasserverErrors:true
     
         });
      }
    });
  
module.exports = router;