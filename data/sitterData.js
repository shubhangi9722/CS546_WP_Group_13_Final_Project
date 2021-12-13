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
      $and: [{ email: email.toLowerCase() }, { active_status: 1 }],
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
    password,
    price,
    bio
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

    if (!price) {
      throw "You must enter price based on your availability";
    }

    if (!bio) {
      throw "You must provide some details about yourself";
    }

    if (typeof firstName !== "string") {
      throw "first name must be string";
    }

    if (typeof lastName !== "string") {
      throw "last name must be string";
    }

    if (typeof email !== "string") {
      throw "e-mail must be string";
    }

    if (typeof phone_number !== "string") {
      throw "phone number must be string";
    }

    if (typeof gender !== "string") {
      throw "gender must be string";
    }

    if (typeof address !== "string") {
      throw "address must be string";
    }

    if (typeof city !== "string") {
      throw "city must be string";
    }

    if (typeof state !== "string") {
      throw "state must be string";
    }

    if (typeof zipcode !== "string") {
      throw "zipcode must be string";
    }

    if (typeof dob !== "string") {
      throw "date of birth must be string";
    }

    if (typeof password !== "string") {
      throw "password must be string";
    }

    if (typeof price !== "string") {
      throw "price provided must be a string";
    }

    if (typeof bio !== "string") {
      throw "bio provided must be a string";
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

    // if (service_availability.trim() === "") {
    // 	throw "service_availability cannot be empty string"
    // }
    // if (priceRange.trim() === "") {
    // 	throw "priceRange cannot be empty string"
    // }
    if (bio.trim() === "") {
      throw "bio cannot be empty string";
    }

    let dobregex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (!dob.valueOf().match(dobregex)) {
      throw "Date of birth format is incorrect";
    }

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

    let priceInt = parseInt(price);
    email = email.trim();

    let newsitter = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      dob: dob.trim(),
      email: email.toLowerCase(),
      phone_number: phone_number.trim(),
      gender: gender.toLocaleLowerCase().trim(),
      address: address.toLocaleLowerCase().trim(),
      city: city.toLocaleLowerCase().trim(),
      state: state.toLocaleLowerCase().trim(),
      zipcode: zipcode.trim(),
      password: passhash,
      price: priceInt,
      bio: bio.trim(),
      //active_status:active_status,
      overall_rating: 0,
      reviews: [],
      active_status: 1,
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
    try {
      let emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!email.valueOf().match(emailRegex)) {
        throw "e-mail format is incorrect";
      }
      const sittersCollection = await sitters();
      const addedUser = await sittersCollection.findOne({
        email: email.toLowerCase(),
      });
      if (addedUser === null) throw "User does not exists";
      delete addedUser.password;
      //addedUser.password = "";
      addedUser._id = addedUser._id.toString();
      return addedUser;
    } catch (e) {
      return e.message;
    }
  },

  async updateSitter(
    firstName,
    lastName,
    email,
    phone_number,
    gender,
    address,
    city,
    state,
    zipcode,
    price,
    bio
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

    if (!price) {
      throw "You must provide price";
    }

    if (!bio) {
      throw "You must provide some details about yourself";
    }

    if (typeof firstName !== "string") {
      throw "first name must be string";
    }

    if (typeof lastName !== "string") {
      throw "last name must be string";
    }

    if (typeof email !== "string") {
      throw "e-mail must be string";
    }

    if (typeof phone_number !== "string") {
      throw "phone number must be string";
    }

    if (typeof gender !== "string") {
      throw "gender must be string";
    }

    if (typeof address !== "string") {
      throw "address must be string";
    }

    if (typeof city !== "string") {
      throw "city must be string";
    }

    if (typeof state !== "string") {
      throw "state must be string";
    }

    if (typeof zipcode !== "string") {
      throw "zipcode must be string";
    }

    if (typeof price !== "string") {
      throw "price must be string";
    }

    if (typeof bio !== "string") {
      throw "bio must be string";
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

    if (bio.trim() === "") {
      throw "date of birth cannot be empty string";
    }

    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.valueOf().match(emailRegex)) {
      throw "e-mail format is incorrect";
    }

    let phnregex =
      /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    if (!phone_number.valueOf().match(phnregex)) {
      throw "your phone number format is incorrect";
    }

    let updatedSitter = {};

    let priceInt = parseInt(price);

    email = email.trim();
    email = email.toLowerCase();

    const sitterCollection = await sitters();
    let oldSitterdetails = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone_number: phone_number.trim(),
      gender: gender.toLowerCase().trim(),
      address: address.toLowerCase().trim(),
      city: city.toLowerCase().trim(),
      state: state.toLowerCase().trim(),
      zipcode: zipcode.trim(),
      price: priceInt.trim(),
      bio: bio.trim(),
    };

    const updatedInfo = await sitterCollection.updateOne(
      { email: email },
      { $set: oldSitterdetails }
    );

    if (updatedInfo.modifiedCount === 0) {
      throw "Sorry, could not update sitter details successfully";
    }

    updatedSitter["sitterUpdated"] = true;
    return updatedSitter;
  },

  async getCuerrntSitterInfo(email) {
    if (!email || email.trim() === "") throw " email not available";

    email = email.trim();

    email = email.toLowerCase();
    const sitterCollection = await sitters();
    const sitterInfo = await sitterCollection.findOne({ email: email });
    if (sitterInfo === null) throw "User not found";

    return sitterInfo;
  },

  async DeleteSitter(email) {
    if (!email || email.trim() === "") throw " email not available";

    let oldSitterdetails = {
      active_status: 0,
    };

    email = email.trim();

    email = email.toLowerCase();
    //console.log(email)
    const sitterCollection = await sitters();
    const sitterInfo = await sitterCollection.updateOne(
      { email: email },
      { $set: oldSitterdetails }
    );
    if (sitterInfo === null) throw "User not found";
    sitterInfo["sitterDeleted"] = true;

    return sitterInfo;
  },

  async getreviews(email) {
    if (!email || email.trim() === "") throw " email not available";
    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.valueOf().match(emailRegex)) {
      throw "e-mail format is incorrect";
    }

    email = email.trim();
    const sittersCollection = await sitters();
    const addedUser = await sittersCollection.findOne({
      email: email.toLowerCase(),
    });
    if (addedUser === null) throw "User does not exists";
    delete addedUser.password;
    //addedUser.password = "";
    addedUser._id = addedUser._id.toString();
    return addedUser.reviews;
  },
};
