const express = require('express');
const router = express.Router();
const data = require("../data/sitterData");
const bookingData = require("../data/bookingData");
const sitterData = data.sitter;
let zipcodes = require('zipcodes');

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
  })
  


  router.post('/updateSitter', async (req, res) => {
    const rest_params = req.body;
 
  if (!rest_params.firstName) {
    res.status(400).json({ error: "You must provide first name" });
    return ;
  }

  if (!rest_params.lastName) {
    res.status(400).json({ error: "You must provide last name" });
    return;
  }
  if (!rest_params.email) {
    res.status(400).json({ error: "You must provide e-mail" });
    return;
  }

  if (!rest_params.phone_number) {
    res.status(400).json({ error: "You must provide phone number" });
    return;
  }

  if (!rest_params.gender) {
    res.status(400).json({ error: "You must provide gender" });
    return;
  }

  if (!rest_params.address) {
    res.status(400).json({ error: "You must provide adress" });
    return;
  }

  if (!rest_params.zipcode) {
    res.status(400).json({ error: "You must provide zipcode" });
    return;
  }

  if (!rest_params.service_availability) {
    res.status(400).json({ error: "You must provide date of birth" });
    return;
  }

  if (!rest_params.price) {
    res.status(400).json({ error: "You must provide date of birth" });
    return;
  }

  if (!rest_params.bio) {
    res.status(400).json({ error: "You must provide date of birth" });
    return;
  }


  if (typeof rest_params.firstName !== "string") {
    res.status(400).json({ error: "first name must be sting" });
    return;
  }

  if (typeof rest_params.lastName !== "string") {
    res.status(400).json({ error: "last name must be sting" });
    return;
  }

  if (typeof rest_params.email !== "string") {
    res.status(400).json({ error: "e-mail must be sting" });
    return;
  }

  if (typeof rest_params.phone_number !== "string") {
    res.status(400).json({ error: "phone number must be sting" });
    return;
  }

  if (typeof rest_params.gender !== "string") {
    res.status(400).json({ error: "gender must be sting" });
    return;
  }

  if (typeof rest_params.address !== "string") {
    res.status(400).json({ error: "adress must be sting" });
    return;
  }


  if (typeof rest_params.zipcode !== "string") {
    res.status(400).json({ error: "zipcode must be sting" });
    return;
  }

  if (typeof rest_params.price !== "string") {
    res.status(400).json({ error: "zipcode must be sting" });
    return;
  }

  if (typeof rest_params.bio !== "string") {
    res.status(400).json({ error: "zipcode must be sting" });
    return;
  }

  if (rest_params.firstName.trim() === "") {
    res.status(400).json({ error: "first name cannot be empty string" });
    return;
  }
  if (rest_params.lastName.trim() === "") {
    res.status(400).json({ error: "last name cannot be empty string" });
    return;
  }

  if (rest_params.email.trim() === "") {
    res.status(400).json({ error: "e-mail cannot be empty string" });
    return;
  }
  if (rest_params.phone_number.trim() === "") {
    res.status(400).json({ error: "phone numbe cannot be empty string" });
    return;
  }
  if (rest_params.gender.trim() === "") {
    res.status(400).json({ error: "gender cannot be empty string" });
    return;
  }
  if (rest_params.address.trim() === "") {
    res.status(400).json({ error: "adress cannot be empty string" });
    return;
  }

  if (rest_params.zipcode.trim() === "") {
    res.status(400).json({ error: "zipcode cannot be empty string" });
    return;
  }

  if (rest_params.price.trim() === "") {
    res.status(400).json({ error: "date of birth cannot be empty string" });
    return;
  }

  if (rest_params.bio.trim() === "") {
    res.status(400).json({ error: "date of birth cannot be empty string" });
    return;
  }

  let emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!rest_params.email.valueOf().match(emailRegex)) {
    res.status(400).json({ error: 
      "e-mail format is incorrect"
    });
    return;
  }

  let phnregex=/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/
  if (!rest_params.phone_number.valueOf().match(phnregex)) {
    res.status(400).json({ error: 
      "your phone number format is incorrect"
    });
    return;
  }

  let zipvalid=/^\d{5}$/
  if (!rest_params.zipcode.valueOf().match(zipvalid)) {
    res.status(400).json({ error: 
      "your zipcode is incorrect"
    });
    return;
  }

  
  try {
    const { firstName, lastName, email, phone_number, gender, address, zipcode, service_availability, price, bio} = rest_params;

    let zipcitystate= zipcodes.lookup(zipcode);
    if (zipcitystate === null|| zipcitystate === undefined)
    {
      throw 'Your Zipcode does not have any related city or state';
    } 


    const update = await sitterData.updateSitter( firstName, lastName, email, phone_number, gender, address,
      zipcitystate.city,
      zipcitystate.state,
      zipcode,
      service_availability, price, bio
    );
    return res.json(update);   
  } catch (e) {
    res.status(500).send();
  }

})  

module.exports = router;