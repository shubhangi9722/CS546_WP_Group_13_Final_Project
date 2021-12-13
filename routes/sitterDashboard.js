const express = require("express");
const router = express.Router();
const data = require("../data");
const bookingData = data.booking;
const sitterData = data.sitter;
let zipcodes = require("zipcodes");
const xss = require("xss");

router.get("/", async (req, res) => {
  try {
    if (
      !req.session.user ||
      req.session.isLogIn == true ||
      req.session.user.usertype != "sitter"
    ) {
      res.render("customer/error");
    } else {
      res.render("sitter/sitterdashboard", {
        email: xss(req.session.user.email),
      });
    }
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/updateSitter", async (req, res) => {
  const rest_params = xss(req.body);
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

    // if (!rest_params.service_availability) {
    //   throw "You must provide date of birth"
    //
    // }

    if (!rest_params.price) {
      throw "You must provide price";
    }

    if (!rest_params.bio) {
      throw "You must provide bio";
    }

    if (typeof rest_params.firstName !== "string") {
      throw "first name must be string";
    }

    if (typeof rest_params.lastName !== "string") {
      throw "last name must be string";
    }

    if (typeof rest_params.email !== "string") {
      throw "e-mail must be string";
    }

    if (typeof rest_params.phone_number !== "string") {
      throw "phone number must be string";
    }

    if (typeof rest_params.gender !== "string") {
      throw "gender must be string";
    }

    if (typeof rest_params.address !== "string") {
      throw "adress must be string";
    }

    if (typeof rest_params.zipcode !== "string") {
      throw "zipcode must be string";
    }

    if (typeof rest_params.price !== "string") {
      throw "price must be string";
    }

    if (typeof rest_params.bio !== "string") {
      throw "bio must be string";
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
      throw "phone number cannot be empty string";
    }
    if (rest_params.gender.trim() === "") {
      throw "gender cannot be empty string";
    }
    if (rest_params.address.trim() === "") {
      throw "address cannot be empty string";
    }

    if (rest_params.zipcode.trim() === "") {
      throw "zipcode cannot be empty string";
    }

    if (rest_params.price.trim() === "") {
      throw "price cannot be empty string";
    }

    if (rest_params.bio.trim() === "") {
      throw "bio cannot be empty string";
    }

    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!rest_params.email.valueOf().match(emailRegex)) {
      throw "e-mail format is incorrect";
    }

    let phnregex =
      /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    if (!rest_params.phone_number.valueOf().match(phnregex)) {
      throw "your phone number format is incorrect";
    }

    let zipvalid = /^\d{5}$/;
    if (!rest_params.zipcode.valueOf().match(zipvalid)) {
      throw "your zipcode is incorrect";
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
      zipcode,
      price,
      bio,
    } = xss(rest_params);

    let zipcitystate = zipcodes.lookup(zipcode);
    if (zipcitystate === null || zipcitystate === undefined) {
      throw "Your Zipcode does not have any related city or state";
    }

    const update = await sitterData.updateSitter(
      firstName,
      lastName,
      email,
      phone_number,
      gender,
      address,
      zipcitystate.city,
      zipcitystate.state,
      zipcode,
      price,
      bio
    );
    return res.json(update);
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.get("/getSitterDetails/:email", async (req, res) => {
  if (!req.params.email) {
    res.status(400).json({ error: "You must provide email" });
    return;
  }
  try {
    const SitterProfile = await sitterData.getCuerrntSitterInfo(
      xss(req.params.email)
    );

    return res.json(SitterProfile);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/deleteSitterProfile/:email", async (req, res) => {
  if (!req.params.email) {
    res.status(400).json({ error: "You must provide email" });
    return;
  }
  try {
    const obj = await sitterData.DeleteSitter(xss(req.params.email));

    return res.json(obj);
  } catch (e) {
    res.status(500).send();
  }
});
module.exports = router;
