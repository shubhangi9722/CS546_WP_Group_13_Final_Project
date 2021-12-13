const express = require("express");
const router = express.Router();
const data = require("../data");
const customerData = data.customer;
const bcrypt = require("bcryptjs");
const saltRounds = 10;
var zipcodes = require("zipcodes");
const xss = require("xss");

//Customer Signup Page
router.get("/", async (req, res) => {
  try {
    //res.render("customer/signup");
    res.render("customer/signupnew");
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

//Customer Signup
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
    errors.push("You must provide adress");
  }

  /*  if (!rest_params.city) {
    errors.push("You must provide city");
  }

  if (!rest_params.state) {
    errors.push("You must provide state");
  }
*/
  if (!rest_params.zipcode) {
    errors.push("You must provide zipcode");
  }

  if (!rest_params.dob) {
    errors.push("You must provide date of birth");
  }

  if (!rest_params.password) {
    errors.push("You must provide password");
  }

  if (!rest_params.dog_name) {
    errors.push("You must provide dog's name");
  }

  if (!rest_params.dog_gender) {
    errors.push("You must provide dog's gender");
  }

  if (!rest_params.dog_breed) {
    errors.push("You must provide dog's breed");
  }

  if (!rest_params.dog_dob) {
    errors.push("You must provide dog's date of birth");
  }

  if (!rest_params.weight) {
    errors.push("You must provide dog's weight");
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
    errors.push("adress must be sting");
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

  if (typeof rest_params.dog_name !== "string") {
    errors.push("dog's name must be sting");
  }

  if (typeof rest_params.dog_gender !== "string") {
    errors.push("dog's gender must be sting");
  }

  if (typeof rest_params.dog_breed !== "string") {
    errors.push("dog's breed must be sting");
  }

  if (typeof rest_params.dog_dob !== "string") {
    errors.push("dog's date of birth must be sting");
  }

  if (typeof rest_params.vet_name !== "string") {
    errors.push("vet name must be sting");
  }

  if (typeof rest_params.vet_phn !== "string") {
    errors.push("vet phone number must be sting");
  }

  /*  if (typeof rest_params.weight === "string") {
    errors.push("weight must be number");
  }*/

  if (typeof rest_params.behavioral_information !== "string") {
    errors.push("dog's behavioral information must be sting");
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
    errors.push("adress cannot be empty string");
  }
  /* if (rest_params.city.trim() === "") {
    errors.push("city cannot be empty string");
  }
  if (rest_params.state.trim() === "") {
    errors.push("state cannot be empty string");
  }
  */
  if (rest_params.zipcode.trim() === "") {
    errors.push("zipcode cannot be empty string");
  }
  if (rest_params.dob.trim() === "") {
    errors.push("date of birth cannot be empty string");
  }
  if (rest_params.password.trim() === "") {
    errors.push("password cannot be empty string");
  }
  if (rest_params.dog_name.trim() === "") {
    errors.push("dog's name cannot be empty string");
  }
  if (rest_params.dog_gender.trim() === "") {
    errors.push("dog's gender cannot be empty string");
  }
  if (rest_params.dog_breed.trim() === "") {
    errors.push("dog's breed cannot be empty string");
  }

  if (rest_params.dog_dob.trim() === "") {
    errors.push("dog's date of birth cannot be empty string");
  }
  if (rest_params.weight.trim() === "") {
    errors.push(" dog's weight cannot be empty string");
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

  var phnregex =
    /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  if (!rest_params.phone_number.valueOf().match(phnregex)) {
    errors.push("your phone number format is incorrect");
  }

  var phnregex =
    /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  if (!rest_params.vet_phn.valueOf().match(phnregex)) {
    errors.push("your dogs veterinarian phone number format is incorrect");
  }

  var zipvalid = /^\d{5}$/;
  if (!rest_params.zipcode.valueOf().match(zipvalid)) {
    errors.push("your zipcode is incorrect");
  }

  console.log("error length", errors.length);
  console.log("error", errors);
  if (errors.length > 0) {
    res.statusCode = 400;
    //res.render("customer/signup"
    res.render("customer/signupnew", {
      firstName: xss(rest_params.firstName),
      lastName: xss(rest_params.lastName),
      email: xss(rest_params.email),
      phone_number: xss(rest_params.phone_number),
      gender: rest_params.gender,
      address: xss(rest_params.address),
      zipcode: xss(rest_params.zipcode),
      dob: xss(rest_params.dob),
      password: xss(rest_params.password),
      dog_name: xss(rest_params.dog_name),
      dog_gender: rest_params.dog_gender,
      dog_breed: xss(rest_params.dog_breed),
      dog_age: xss(rest_params.dog_age),
      dog_dob: xss(rest_params.dog_dob),
      vet_name: xss(rest_params.vet_name),
      vet_phn: xss(rest_params.vet_phn),
      weight: xss(rest_params.weight),
      behavioral_informational_information: xss(
        rest_params.behavioral_informational_information
      ),
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
      password,
      dog_name,
      dog_gender,
      dog_breed,
      dog_dob,
      vet_name,
      vet_phn,
      weight,
      behavioral_information,
    } = xss(rest_params);

    var zipcitystate = zipcodes.lookup(zipcode);
    if (zipcitystate === null || zipcitystate === undefined) {
      throw "Your Zipcode does not have any related city or state";
    }
    const rest = await customerData.createCustomer(
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
      password,
      dog_name,
      dog_gender,
      dog_breed,
      dog_dob,
      vet_name,
      vet_phn,
      weight,
      behavioral_information
    );

    if (rest.userInserted === true) {
      req.session.user = { email: xss(email), usertype: "customer" };
      res.redirect("/customerDashboard");
    }
  } catch (error) {
    console.log("error1", error);
    res.statusCode = 400;
    //res.render("customer/signup"
    res.render("customer/signupnew", {
      error: error,
      firstName: xss(rest_params.firstName),
      lastName: xss(rest_params.lastName),
      email: xss(rest_params.email),
      phone_number: xss(rest_params.phone_number),
      gender: rest_params.gender,
      address: xss(rest_params.address),
      zipcode: xss(rest_params.zipcode),
      dob: xss(rest_params.dob),
      password: xss(rest_params.password),
      dog_name: xss(rest_params.dog_name),
      dog_gender: rest_params.dog_gender,
      dog_breed: xss(rest_params.dog_breed),
      dog_age: xss(rest_params.dog_age),
      dog_dob: xss(rest_params.dog_dob),
      vet_name: xss(rest_params.vet_name),
      vet_phn: xss(rest_params.vet_phn),
      weight: xss(rest_params.weight),
      behavioral_informational_information: xss(
        rest_params.behavioral_informational_information
      ),
      error: errors,
      hasserverErrors: true,
    });
  }
});

module.exports = router;
