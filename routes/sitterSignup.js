const express = require("express");
const router = express.Router();
const data = require("../data");
const sitterData = data.sitter;
const bcrypt = require("bcryptjs");
const saltRounds = 10;
var zipcodes = require("zipcodes");
const xss = require('xss');

//sitter Signup Page
router.get("/", async (req, res) => {
  try {
    //res.render("sitter/signup");
    res.render("sitter/signupnew");
    //res.render(xss("sitter/signupnew"));
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

//sitter Signup post
router.post("/", async (req, res) => {
  const rest_params = xss(req.body);
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

  if (!rest_params.price) {
    errors.push("You must provide some price");
  }

  if (!rest_params.bio) {
    errors.push("You must provide some information about yourself");
  }



  
  if (typeof rest_params.firstName !== "string") {
    errors.push("first name must be string");
  }

  if (typeof rest_params.lastName !== "string") {
    errors.push("last name must be string");
  }

  if (typeof rest_params.email !== "string") {
    errors.push("e-mail must be string");
  }

  if (typeof rest_params.phone_number !== "string") {
    errors.push("phone number must be string");
  }

  if (typeof rest_params.gender !== "string") {
    errors.push("gender must be string");
  }

  if (typeof rest_params.address !== "string") {
    errors.push("address must be string");
  }

  /*  if (typeof rest_params.city !== "string") {
    errors.push("city must be sting");
  }

  if (typeof rest_params.state !== "string") {
    errors.push("state must be sting");
  }
  */

  if (typeof rest_params.zipcode !== "string") {
    errors.push("zipcode must be string");
  }

  if (typeof rest_params.password !== "string") {
    errors.push("password must be string");
  }

  if (typeof rest_params.price !== "string") {
    errors.push("price must be string");
  }

  if (typeof rest_params.bio !== "string") {
    errors.push("bio must be string");
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

  // if (rest_params.service_availability.trim() === "") {
  //   errors.push("service availability cannot be empty string");
  // }

  // if (rest_params.price.trim() === "") {
  //   errors.push("price cannot be empty string");
  // }

  if (rest_params.bio.trim() === "") {
    errors.push("bio cannot be empty string");
  }

  let dobregex=/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/
    if (!rest_params.dob.valueOf().match(dobregex)) {
      errors.push ("Date of birth format is incorrect");
    }

  let emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!rest_params.email.valueOf().match(emailRegex)) {
    errors.push("e-mail format is incorrect");
  }

  let passRegex = /^[a-zA-Z0-9\-_]{6,40}$/;
  if (!rest_params.password.valueOf().match(passRegex)) {
    errors.push(
      "passwor cannot have spaces,only alphanumeric characters and minimum of 6 characters long."
    );
  }
  let phnregex =
    /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  if (!rest_params.phone_number.valueOf().match(phnregex)) {
    errors.push("your phone number format is incorrect");
  }
  let zipvalid = /^\d{5}$/;
  if (!rest_params.zipcode.valueOf().match(zipvalid)) {
    errors.push("your zipcode is incorrect");
  }

  // if (rest_params.active_status === "Yes" || rest_params.active_status === "No") {
  //   active_status = rest_params.active_status;
  // } else {
  //   errors.push("Please select a status");
  // }

  if (errors.length > 0) {
    res.statusCode = 400;
    //res.render("sitter/signup"
    res.render("sitter/signupnew", {
      firstName: xss(rest_params.firstName),
      lastName: xss(rest_params.lastName),
      dob: xss(rest_params.dob),
      email: xss(rest_params.email),
      phone_number: xss(rest_params.phone_number),
      gender: xss(rest_params.gender),
      address: xss(rest_params.address),
      zipcode: xss(rest_params.zipcode),
      password: xss(rest_params.password),
      //active_status:rest_params.active_status,
      //service_availability: rest_params.service_availability,
      price: xss(rest_params.price),
      bio: xss(rest_params.bio),
      error: errors,
      hasErrors: true,
    });
    return;
  }
  try {
    const {
      firstName,
      lastName,
      dob,
      email,
      phone_number,
      gender,
      address,
      zipcode,
      password,
      //service_availability,
      price,
      bio
      //active_status
    } = xss(rest_params);

    let zipcitystate = await zipcodes.lookup(zipcode);

    const rest = await sitterData.createSitter(
      firstName,
      lastName,
      dob,
      email,
      phone_number,
      gender,
      address,
      zipcitystate.city,
      zipcitystate.state,
      zipcode,
      password,
      //service_availability,
      price,
      bio
      //active_status
    );

    if (rest.userInserted === true) {
      req.session.user = { email: xss(email), usertype: "sitter" };
      res.redirect("/sitterDashboard");
    }
  } catch (error) {
    res.statusCode = 400;
    //res.render("sitter/signup"
    res.render("sitter/signupnew", {
      error: error,
      firstName: xss(rest_params.firstName),
      lastName: xss(rest_params.lastName),
      dob: xss(rest_params.dob),
      email: xss(rest_params.email),
      phone_number: xss(rest_params.phone_number),
      gender: xss(rest_params.gender),
      address: xss(rest_params.address),
      zipcode: xss(rest_params.zipcode),
      password: xss(rest_params.password),
      //service_availability: rest_params.service_availability,
      price: xss(rest_params.price),
      bio: xss(rest_params.bio),
      //active_status:rest_params.active_status,
      hasserverErrors: true,
    });
  }
});

module.exports = router;
