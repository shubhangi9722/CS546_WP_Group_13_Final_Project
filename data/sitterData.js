const mongoCollections = require("../config/mongoCollections");
const sitters = mongoCollections.sitters;
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const { ObjectId } = require("mongodb");
//const { get } = require('../routes/sitterSignup');

module.exports = {
  //validate login
  async checkSitter(email, password) {
    if (!email || !password) {
      throw "All fields need to have valid values";
    }

    if (typeof email !== "string") {
      throw "input value of username is not a string ";
    }
    if (typeof password !== "string") {
      throw "input value of password is not a string";
    }

    if (email.trim() === "") throw "name cannot be empty string";
    if (password.trim() === "") throw "location cannot be empty string";

    let obj = {};

    const sittersCollection = await sitters();
    const addedUser = await sittersCollection.findOne({
      email: email.toLocaleLowerCase(),
    });
    let compareToMatch = false;
    if (addedUser !== null) {
      const pass = addedUser.password;
      compareToMatch = await bcrypt.compare(password, pass);
    } else {
      throw "Either the username or password is invalid";
    }

    obj["authenticated"] = true;

    if (compareToMatch) {
      return obj;
    } else {
      throw "Either the username or password is invalid";
    }
  },

  async createSitter(
    firstName,
    lastName,
    dob,
    email,
    phone_number,
    gender,
    address,
    city,
    state,
    zipcode,
    password
    //active_status,
  ) {
    if (!firstName) {
      throw "You must provide first name";
    }

    if (!lastName) {
      throw "You must provide last name";
    }
    if (!email) {
      throw "You must provide e-mail";
    }

    if (!phone_number) {
      throw "You must provide phone number";
    }

    if (!gender) {
      throw "You must provide gender";
    }

    if (!address) {
      throw "You must provide address";
    }

    if (!city) {
      throw "You must provide city";
    }

    if (!state) {
      throw "You must provide state";
    }

    if (!zipcode) {
      throw "You must provide zipcode";
    }

    if (!dob) {
      throw "You must provide date of birth";
    }

    if (!password) {
      throw "You must provide password";
    }

    // if (!active_status) {
    //   throw "You must state your status"
    // }

    if (typeof firstName !== "string") {
      throw "first name must be sting";
    }

    if (typeof lastName !== "string") {
      throw "last name must be sting";
    }

    if (typeof email !== "string") {
      throw "e-mail must be sting";
    }

    if (typeof phone_number !== "string") {
      throw "phone number must be sting";
    }

    if (typeof gender !== "string") {
      throw "gender must be sting";
    }

    if (typeof address !== "string") {
      throw "address must be sting";
    }

    if (typeof city !== "string") {
      throw "city must be sting";
    }

    if (typeof state !== "string") {
      throw "state must be sting";
    }

    if (typeof zipcode !== "string") {
      throw "zipcode must be sting";
    }

    if (typeof dob !== "string") {
      throw "date of birth must be sting";
    }

    if (typeof password !== "string") {
      throw "password must be sting";
    }

    if (firstName.trim() === "") {
      throw "first name cannot be empty string";
    }
    if (lastName.trim() === "") {
      throw "last name cannot be empty string";
    }

    if (email.trim() === "") {
      throw "e-mail cannot be empty string";
    }
    if (phone_number.trim() === "") {
      throw "phone numbe cannot be empty string";
    }
    if (gender.trim() === "") {
      throw "gender cannot be empty string";
    }
    if (address.trim() === "") {
      throw "address cannot be empty string";
    }
    if (city.trim() === "") {
      throw "city cannot be empty string";
    }
    if (state.trim() === "") {
      throw "state cannot be empty string";
    }
    if (zipcode.trim() === "") {
      throw "zipcode cannot be empty string";
    }
    if (dob.trim() === "") {
      throw "date of birth cannot be empty string";
    }
    if (password.trim() === "") {
      throw "password cannot be empty string";
    }

    /*if (active_status.trim() === "") {
      throw "status cannot be empty string"
    }*/

    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.valueOf().match(emailRegex)) {
      throw "e-mail format is incorrect";
    }

    let passRegex = /^[a-zA-Z0-9\-_]{6,40}$/;
    if (!password.valueOf().match(passRegex)) {
      throw "passwor cannot have spaces,only alphanumeric characters and minimum of 6 characters long.";
    }

    let phnregex =
      /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    if (!phone_number.valueOf().match(phnregex)) {
      throw "your phone number format is incorrect";
    }

    let obj = {};

    const passhash = await bcrypt.hash(password, saltRounds);
    const sittersCollection = await sitters();

    let newsitter = {
      firstName: firstName.toLocaleLowerCase(),
      lastName: lastName.toLocaleLowerCase(),
      dob: dob,
      email: email.toLocaleLowerCase(),
      phone_number: phone_number,
      gender: gender.toLocaleLowerCase(),
      address: address.toLocaleLowerCase(),
      city: city.toLocaleLowerCase(),
      state: state.toLocaleLowerCase(),
      zipcode: zipcode,
      password: passhash,
      //active_status:active_status,
      overall_rating: 0,
      reviews: [],
    };

    // if (active_status ==="Yes" || active_status === "No"){
    //   active_status = newsitter.active_status;
    // } else {
    //   throw "Please provide valid status";
    // }

    const addedUser = await sittersCollection.findOne({
      email: email.toLocaleLowerCase(),
    });
    if (addedUser !== null) throw "User Already exists";
    const insertInfo = await sittersCollection.insertOne(newsitter);
    if (insertInfo.insertedCount === 0) throw "Failed to add user";

    obj["userInserted"] = true;
    return obj;
  },

  async getSitterEmail(email) {
    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.valueOf().match(emailRegex)) {
      throw "e-mail format is incorrect";
    }
    const sittersCollection = await sitters();
    const addedUser = await sittersCollection.findOne({
      email: email.toLocaleLowerCase(),
    });
    if (addedUser === null) throw "User does not exists";
    delete addedUser.password;
    //addedUser.password = "";
    addedUser._id = addedUser._id.toString();
    return addedUser;
  },
};
