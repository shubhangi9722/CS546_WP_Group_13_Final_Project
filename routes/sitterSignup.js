const express = require("express");
const router = express.Router();
const data = require("../data");
const sitterData = data.sitter;
const bcrypt = require("bcryptjs");
const saltRounds = 16;
var zipcodes = require('zipcodes');

//sitter Signup Page
router.get("/", async (req, res) => {
  try {
    res.render("sitter/signup");
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});


//sitter Signup post
router.post("/", async (req, res) => {
  const rest_params = req.body;
  let errors = [];
  if (!rest_params.firstName) {
    errors.push("You must provide first name");
  }

  if (!rest_params.lastName) {
    errors.push("You must provide last name");
  }
  if (!rest_params.email) {
    errors.push("You must provide e-mail");
  }

  if (!rest_params.phone_number) {
    errors.push("You must provide phone number");
  }

  if (!rest_params.gender) {
    errors.push("You must provide gender");
  }

  if (!rest_params.address) {
    errors.push("You must provide address");
  }

 /* if (!rest_params.city) {
    errors.push("You must provide city");
  }

  if (!rest_params.state) {
    errors.push("You must provide state");
  }*/

  if (!rest_params.zipcode) {
    errors.push("You must provide zipcode");
  }

  if (!rest_params.dob) {
    errors.push("You must provide date of birth");
  }

  if (!rest_params.password) {
    errors.push("You must provide password");
  }


  if (typeof rest_params.firstName !== "string") {
    errors.push("first name must be sting");
  }

  if (typeof rest_params.lastName !== "string") {
    errors.push("last name must be sting");
  }

  if (typeof rest_params.email !== "string") {
    errors.push("e-mail must be sting");
  }

  if (typeof rest_params.phone_number !== "string") {
    errors.push("phone number must be sting");
  }

  if (typeof rest_params.gender !== "string") {
    errors.push("gender must be sting");
  }

  if (typeof rest_params.address !== "string") {
    errors.push("address must be sting");
  }

/*  if (typeof rest_params.city !== "string") {
    errors.push("city must be sting");
  }

  if (typeof rest_params.state !== "string") {
    errors.push("state must be sting");
  }
  */

  if (typeof rest_params.zipcode !== "string") {
    errors.push("zipcode must be sting");
  }

  if (typeof rest_params.password !== "string") {
    errors.push("password must be sting");
  }

  if (rest_params.firstName.trim() === "") {
    errors.push("first name cannot be empty string");
  }
  if (rest_params.lastName.trim() === "") {
    errors.push("last name cannot be empty string");
  }

  if (rest_params.email.trim() === "") {
    errors.push("e-mail cannot be empty string");
  }
  if (rest_params.phone_number.trim() === "") {
    errors.push("phone numbe cannot be empty string");
  }
  if (rest_params.gender.trim() === "") {
    errors.push("gender cannot be empty string");
  }
  if (rest_params.address.trim() === "") {
    errors.push("address cannot be empty string");
  }
  /*if (rest_params.city.trim() === "") {
    errors.push("city cannot be empty string");
  }
  if (rest_params.state.trim() === "") {
    errors.push("state cannot be empty string");
  }*/
  if (rest_params.zipcode.trim() === "") {
    errors.push("zipcode cannot be empty string");
  }
  if (rest_params.dob.trim() === "") {
    errors.push("date of birth cannot be empty string");
  }
  if (rest_params.password.trim() === "") {
    errors.push("password cannot be empty string");
  }

  var emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!rest_params.email.valueOf().match(emailRegex)) {
    errors.push(
      "e-mail format is incorrect"
    );
  }

  var passRegex = /^[a-zA-Z0-9\-_]{6,40}$/;
  if (!rest_params.password.valueOf().match(passRegex)) {
    errors.push(
      "passwor cannot have spaces,only alphanumeric characters and minimum of 6 characters long."
    );
  }
  var phnregex=/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/
  if (!rest_params.phone_number.valueOf().match(phnregex)) {
    errors.push(
      "your phone number format is incorrect"
    );
  }
  var zipvalid=/^\d{5}$/
  if (!rest_params.zipcode.valueOf().match(zipvalid)) {
    errors.push(
      "your zipcode is incorrect"
    );
  }
  

  if (errors.length > 0) {
    res.statusCode = 400;
    res.render("sitter/signup", {
      firstName:rest_params.firstName,
      lastName:rest_params.lastName,
      email: rest_params.email,
      phone_number:rest_params.phone_number,
      gender:rest_params.gender,
      address:rest_params.address,
      zipcode:rest_params.zipcode,
      dob:rest_params.dob,
      password:rest_params.password,
      error: errors,
      hasErrors: true,
    });
    return;
  }
  try {
    const {
      firstName,
      lastName,
      email,
      phone_number,
      gender,
      address,
      dob,
      zipcode,
      password
    } = rest_params;

    var zipcitystate= await zipcodes.lookup(zipcode);
    

    const rest = await  sitterData.createSitter(
      firstName,
      lastName,
      email,
      phone_number,
      gender,
      address,
      zipcitystate.city,
      zipcitystate.state,
      zipcode,
      dob,
      password
    );

    if (rest.userInserted === true) {
      req.session.user = { email: email, usertype:'sitter'};
      res.redirect("/sitterDashboard");
    }
  } catch (error) {
    res.statusCode = 400;
    res.render("sitter/signup", {
      error: error,
      firstName:rest_params.firstName,
      lastName:rest_params.lastName,
      email:email,
      phone_number:rest_params.phone_number,
      gender:rest_params.gender,
      address:rest_params.address,
      zipcode:rest_params.zipcode,
      dob:rest_params.dob,
      password:rest_params.password,
      hasserverErrors: true,
    });
  }
});

module.exports = router;
