const express = require("express");
const router = express.Router();
const data = require("../data");
const bookingData = data.booking;
const CustomerData = data.customer;
var zipcodes = require("zipcodes");

router.get("/", async (req, res) => {
  try {
    if (
      req.session.user.usertype == "sitter" ||
      !req.session.user ||
      req.session.isLogIn == true ||
      req.session.usertype == "admin"
    ) {
      res.render("customer/error");
    } else {
      res.render("customer/customerdashboard", {
        email: req.session.user.email,
      });
    }
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/getsitterfordashboard", async (req, res) => {
  try {
    const SitterData = await CustomerData.getsitterDataforDashboard();

    return res.json(SitterData);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/getOwnerfordashboard", async (req, res) => {
  try {
    const ownerData = await CustomerData.getOwnerDataforDashboard();

    return res.json(ownerData);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/getCustomerDetails/:email", async (req, res) => {
  if (!req.params.email) {
    throw "You must provide email";
  }
  try {
    const CustomerProfile = await CustomerData.getCuerrntCustomerInfo(
      req.params.email
    );

    return res.json(CustomerProfile);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/getfiltersearchresult", async (req, res) => {
  const rest_params = req.body;
  try {
    const { serachterm, zipcode, rating, pricerange } = rest_params;

    const searchreuslt = await CustomerData.filterresult(
      serachterm,
      zipcode,
      rating,
      pricerange
    );

    return res.json(searchreuslt);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/UpdateOwner", async (req, res) => {
  const rest_params = req.body;
  try {
    if (!rest_params.firstName) {
      throw "You must provide first name";
    }

    if (!rest_params.lastName) {
      throw "You must provide last name";
    }
    if (!rest_params.email) {
      throw "You must provide e-mail";
    }

    if (!rest_params.phone_number) {
      throw "You must provide phone number";
    }

    if (!rest_params.gender) {
      throw "You must provide gender";
    }

    if (!rest_params.address) {
      throw "You must provide adress";
    }

    if (!rest_params.zipcode) {
      throw "You must provide zipcode";
    }

    if (!rest_params.dob) {
      throw "You must provide date of birth";
    }

    if (typeof rest_params.firstName !== "string") {
      throw "first name must be sting";
    }

    if (typeof rest_params.lastName !== "string") {
      throw "last name must be sting";
    }

    if (typeof rest_params.email !== "string") {
      throw "e-mail must be sting";
    }

    if (typeof rest_params.phone_number !== "string") {
      throw "phone number must be sting";
    }

    if (typeof rest_params.gender !== "string") {
      throw "gender must be sting";
    }

    if (typeof rest_params.address !== "string") {
      throw "adress must be sting";
    }

    if (typeof rest_params.zipcode !== "string") {
      throw "zipcode must be sting";
    }

    if (rest_params.firstName.trim() === "") {
      throw "first name cannot be empty string";
    }
    if (rest_params.lastName.trim() === "") {
      throw "last name cannot be empty string";
    }

    if (rest_params.email.trim() === "") {
      throw "e-mail cannot be empty string";
    }
    if (rest_params.phone_number.trim() === "") {
      throw "phone numbe cannot be empty string";
    }
    if (rest_params.gender.trim() === "") {
      throw "gender cannot be empty string";
    }
    if (rest_params.address.trim() === "") {
      throw "adress cannot be empty string";
    }

    if (rest_params.zipcode.trim() === "") {
      throw "zipcode cannot be empty string";
    }
    if (rest_params.dob.trim() === "") {
      throw "date of birth cannot be empty string";
    }

    var emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!rest_params.email.valueOf().match(emailRegex)) {
      throw "e-mail format is incorrect";
    }

    var phnregex =
      /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    if (!rest_params.phone_number.valueOf().match(phnregex)) {
      throw "your phone number format is incorrect";
    }
    var zipvalid = /^\d{5}$/;
    if (!rest_params.zipcode.valueOf().match(zipvalid)) {
      throw "your zipcode is incorrect";
    }
    var dobregex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (!rest_params.dob.valueOf().match(dobregex)) {
      throw "your date of bith format is incorrect";
    }
  } catch (e) {
    return res.status(400).json(e);
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
    } = rest_params;

    var zipcitystate = zipcodes.lookup(zipcode);
    if (zipcitystate === null || zipcitystate === undefined) {
      throw "Your Zipcode does not have any related city or state";
    }
    const rest = await CustomerData.UpdateOwner(
      firstName,
      lastName,
      email,
      phone_number,
      gender,
      address,
      zipcitystate.city,
      zipcitystate.state,
      zipcode,
      dob
    );

    return res.json(rest);
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.post("/UpdateDog", async (req, res) => {
  const rest_params = req.body;
  try {
    if (!rest_params.dog_name) {
      throw "You must provide dog name";
    }

    if (!rest_params.dog_gender) {
      throw "You must provide dog gender";
    }
    if (!rest_params.dog_breed) {
      throw "You must provide dog breed";
    }

    if (!rest_params.dog_dob) {
      throw "You must provide dog date of birth";
    }

    if (!rest_params.weight) {
      throw "You must dog weight";
    }

    if (typeof rest_params.dog_name !== "string") {
      throw "dog name must be sting";
    }

    if (typeof rest_params.dog_gender !== "string") {
      throw "dog gender must be sting";
    }

    if (typeof rest_params.dog_breed !== "string") {
      throw "dog breed must be sting";
    }

    if (typeof rest_params.dog_dob !== "string") {
      throw "dog date of birth must be sting";
    }

    if (typeof rest_params.vet_name !== "string") {
      throw "Veterinarian name must be sting";
    }

    if (typeof rest_params.vet_phn !== "string") {
      throw "Veterinarian Phone Number must be sting";
    }

    if (typeof rest_params.behavioral_information !== "string") {
      throw "Dog Behavioral Information must be sting";
    }

    if (rest_params.dog_name.trim() === "") {
      throw "dog name cannot be empty string";
    }
    if (rest_params.dog_gender.trim() === "") {
      throw "dog gender cannot be empty string";
    }

    if (rest_params.dog_breed.trim() === "") {
      throw "e-mail cannot be empty string";
    }
    if (rest_params.dog_dob.trim() === "") {
      throw "dog breed cannot be empty string";
    }

    if (rest_params.weight.trim() === "") {
      throw "dog weight cannot be empty string";
    }

    var dobregex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (!rest_params.dog_dob.valueOf().match(dobregex)) {
      throw "your dog date of bith format is incorrect";
    }

    if (rest_params.vet_phn != "") {
      var phnregex =
        /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
      if (!rest_params.vet_phn.valueOf().match(phnregex)) {
        throw "your veterinarian phone number format is incorrect";
      }
    }
  } catch (e) {
    return res.status(400).json(e);
  }

  try {
    const {
      dog_name,
      dog_gender,
      email,
      dog_breed,
      dog_dob,
      vet_name,
      vet_phn,
      weight,
      behavioral_information,
    } = rest_params;

    const rest = await CustomerData.UpdateDog(
      dog_name,
      dog_gender,
      email,
      dog_breed,
      dog_dob,
      vet_name,
      vet_phn,
      weight,
      behavioral_information
    );

    return res.json(rest);
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.get("/getsitterReview", async (req, res) => {
  try {
    //  const SitterData = await CustomerData.getsitterDataforDashboard();
    res.render("sitter/sitterReviews");
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
