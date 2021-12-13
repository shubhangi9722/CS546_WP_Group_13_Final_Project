const mongoCollections = require("../config/mongoCollections");
const dogOwners = mongoCollections.dogOwners;
const sitters = mongoCollections.sitters;
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const { ObjectId } = require("mongodb");

module.exports = {
  //validate login
  async checkCustomer(email, password) {
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

    const dogOwnerCollection = await dogOwners();
    const addedUser = await dogOwnerCollection.findOne({
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

  //create Customer
  async createCustomer(
    firstName,
    lastName,
    email,
    phone_number,
    gender,
    address,
    city,
    state,
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

    if (!dog_name) {
      throw "You must provide dog's name";
    }

    if (!dog_gender) {
      throw "You must provide dog's gender";
    }

    if (!dog_breed) {
      throw "You must provide dog's breed";
    }

    if (!dog_dob) {
      throw "You must provide dog's date of birth";
    }

    if (!vet_name) {
      throw "You must provide dogs' vet name";
    }

    if (!vet_phn) {
      throw "You must provide dogs' vet phone number";
    }

    if (!weight) {
      throw "You must provide dog's weight";
    }

    if (!behavioral_information) {
      throw "You must provide dog's behavioral information";
    }

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

    if (typeof password !== "string") {
      throw "password must be sting";
    }

    if (typeof dog_name !== "string") {
      throw "dog's name must be sting";
    }

    if (typeof dog_gender !== "string") {
      throw "dog's gender must be sting";
    }

    if (typeof dog_breed !== "string") {
      throw "dog's breed must be sting";
    }

    if (typeof dog_dob !== "string") {
      throw "dog's date of birth must be sting";
    }

    if (typeof vet_name !== "string") {
      throw "vet name must be sting";
    }

    if (typeof vet_phn !== "string") {
      throw "vet phone number must be sting";
    }

    /* if (typeof weight === "string") {
          throw "weight must be number"
        }*/

    if (typeof behavioral_information !== "string") {
      throw "dog's behavioral_information must be sting";
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
    if (dog_name.trim() === "") {
      throw "dog's name cannot be empty string";
    }
    if (dog_gender.trim() === "") {
      throw "dog's gender cannot be empty string";
    }
    if (dog_breed.trim() === "") {
      throw "dog's breed cannot be empty string";
    }

    if (dog_dob.trim() === "") {
      throw "dog's date of birth cannot be empty string";
    }
    if (weight.trim() === "") {
      throw " dog's weight cannot be empty string";
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

    if (vet_phn != "") {
      let phnregex =
        /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
      if (!vet_phn.valueOf().match(phnregex)) {
        throw "your vet phone number format is incorrect";
      }
    }

    let obj = {};

    const passhash = await bcrypt.hash(password, saltRounds);
    const dogOwnerCollection = await dogOwners();
    let newcustomer = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase(),
      phone_number: phone_number.trim(),
      gender: gender.trim(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      zipcode: zipcode.trim(),
      dob: dob.trim(),
      password: passhash,
      dog_name: dog_name.trim(),
      dog_gender: dog_gender.trim(),
      dog_breed: dog_breed.trim(),
      dog_dob: dog_dob.trim(),
      vet_name: vet_name.trim(),
      vet_phn: vet_phn.trim(),
      weight: weight.trim(),
      behavioral_information: behavioral_information.trim(),
    };

    const addedUser = await dogOwnerCollection.findOne({
      email: email.toLocaleLowerCase(),
    });
    if (addedUser !== null) throw "User Already exists";
    const insertInfo = await dogOwnerCollection.insertOne(newcustomer);
    if (insertInfo.insertedCount === 0) throw "Failed to add user";

    obj["userInserted"] = true;

    return obj;
  },

  async getsitterDataforDashboard() {
    const sittersCollection = await sitters();
    const sitterList = await sittersCollection.find({}).limit(20).toArray();

    if (sitterList.length == 0) {
      throw [400, `No Sitters Found Right Now....!`];
    } else {
      return sitterList;
    }
  },


  async getOwnerDataforDashboard() {
    const OwnerCollection = await dogOwners();
    const ownerList = await OwnerCollection.find({}).limit(20).toArray();

    if (ownerList.length == 0) {
      throw [400, `No Owners Found Right Now....!`];
    } else {
      return ownerList;
    }
  },



  async getCuerrntCustomerInfo(email) {
    if (!email || email.trim() === "") throw " email not available";

    email = email.trim();
    email = email.toLowerCase();

    const dogOwnerCollection = await dogOwners();
    const custInfo = await dogOwnerCollection.findOne({ email: email });
    if (custInfo === null) throw "User not found";

    return custInfo;
  },

  async filterresult(serachterm, zipcode, rating, pricerange) {
    const sittersCollection = await sitters();

    var overallrating =rating
    

    const namearray = serachterm.split(" ");
    var fname = namearray[0];
    var lname = namearray[1];

    const pricearray = pricerange.split("-");
    var lbound = parseInt(pricearray[0]);
    var ubound = parseInt(pricearray[1]);

    if (
      serachterm == "" &&
      zipcode == "" &&
      rating == "0" &&
      pricerange == "0"
    ) {
      const sitterList = await sittersCollection.find({}).toArray();

      if (sitterList.length == 0) {
        return [];
      }
      return sitterList;
    } else if (
      serachterm != "" &&
      zipcode == "" &&
      rating == "0" &&
      pricerange == "0"
    ) {
      const sitterList = await sittersCollection
        .find({ firstName: fname })
        .toArray();

      if (sitterList.length == 0) {
        return [];
      }
      return sitterList;
    } else if (
      serachterm != "" &&
      zipcode != "" &&
      rating == "0" &&
      pricerange == "0"
    ) {
      const sitterList = await sittersCollection
        .find({ $and: [{ firstName: fname }, { zipcode: zipcode }] })
        .toArray();

      if (sitterList.length == 0) {
        return [];
      }
      return sitterList;
    } else if (
      serachterm != "" &&
      zipcode != "" &&
      rating != "0" &&
      pricerange == "0"
    ) {
      const sitterList = await sittersCollection
        .find({
          $and: [
            { firstName: fname },
            { zipcode: zipcode },
            { overall_rating: parseInt(overallrating) },
          ],
        })
        .toArray();

      if (sitterList.length == 0) {
        return [];
      }
      return sitterList;
    } else if (
      serachterm != "" &&
      zipcode != "" &&
      rating != "0" &&
      pricerange != "0"
    ) {
      const sitterList = await sittersCollection
        .find({
          $and: [
            { firstName: fname },
            { zipcode: zipcode },
            { overall_rating: parseInt(overallrating) },
            { price: { $gt: lbound } },
            { price: { $lt: ubound } },
          ],
        })
        .toArray();

      if (sitterList.length == 0) {
        return [];
      }
      return sitterList;
    } else if (
      serachterm == "" &&
      zipcode != "" &&
      rating == "0" &&
      pricerange == "0"
    ) {
      const sitterList = await sittersCollection
        .find({ zipcode: zipcode })
        .toArray();

      if (sitterList.length == 0) {
        return [];
      }
      return sitterList;
    } else if (
      serachterm == "" &&
      zipcode != "" &&
      rating != "0" &&
      pricerange == "0"
    ) {
      const sitterList = await sittersCollection
        .find({ $and: [{ zipcode: zipcode }, { overall_rating: parseInt(overallrating) }] })
        .toArray();

      if (sitterList.length == 0) {
        return [];
      }
      return sitterList;
    } else if (
      serachterm == "" &&
      zipcode != "" &&
      rating != "0" &&
      pricerange != "0"
    ) {
      const sitterList = await sittersCollection
        .find({
          $and: [
            { zipcode: zipcode },
            { overall_rating: parseInt(overallrating) },
            { price: { $gt: lbound } },
            { price: { $lt: ubound } },
          ],
        })
        .toArray();

      if (sitterList.length == 0) {
        return [];
      }
      return sitterList;
    } else if (
      serachterm == "" &&
      zipcode == "" &&
      rating != "0" &&
      pricerange == "0"
    ) {
      const sitterList = await sittersCollection
        .find({ overall_rating: parseInt(overallrating) })
        .toArray();

      if (sitterList.length == 0) {
        return [];
      }
      return sitterList;
    } else if (
      serachterm == "" &&
      zipcode == "" &&
      rating != "0" &&
      pricerange != "0"
    ) {
      const sitterList = await sittersCollection
        .find({
          $and: [
            { overall_rating: parseInt(overallrating) },
            { price: { $gt: lbound } },
            { price: { $lt: ubound } },
          ],
        })
        .toArray();

      if (sitterList.length == 0) {
        return [];
      }
      return sitterList;
    } else if (
      serachterm == "" &&
      zipcode == "" &&
      rating == "0" &&
      pricerange != "0"
    ) {
      const sitterList = await sittersCollection
        .find({
          $and: [{ price: { $gt: lbound } }, { price: { $lt: ubound } }],
        })
        .toArray();

      if (sitterList.length == 0) {
        return [];
      }
      return sitterList;
    } else if (
      serachterm != "" &&
      zipcode != "" &&
      rating == "0" &&
      pricerange != "0"
    ) {
      const sitterList = await sittersCollection
        .find({
          $and: [
            { firstName: fname },
            { zipcode: zipcode },
            { price: { $gt: lbound } },
            { price: { $lt: ubound } },
          ],
        })
        .toArray();

      if (sitterList.length == 0) {
        return [];
      }
      return sitterList;
    } else if (
      serachterm == "" &&
      zipcode != "" &&
      rating == "0" &&
      pricerange != "0"
    ) {
      const sitterList = await sittersCollection
        .find({
          $and: [
            { zipcode: zipcode },
            { price: { $gt: lbound } },
            { price: { $lt: ubound } },
          ],
        })
        .toArray();

      if (sitterList.length == 0) {
        return [];
      }
      return sitterList;
    }
  },
  async UpdateOwner(
    firstName,
    lastName,
    email,
    phone_number,
    gender,
    address,
    city,
    state,
    zipcode,
    dob
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

    var emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.valueOf().match(emailRegex)) {
      throw "e-mail format is incorrect";
    }

    var phnregex =
      /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
    if (!phone_number.valueOf().match(phnregex)) {
      throw "your phone number format is incorrect";
    }

    var dobregex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (!dob.valueOf().match(dobregex)) {
      throw "your date of bith format is incorrect";
    }

    let obj = {};

    email = email.toLowerCase();

    const dogOwnerCollection = await dogOwners();
    let oldcustomer = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone_number: phone_number.trim(),
      gender: gender.trim(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      zipcode: zipcode.trim(),
      dob: dob.trim(),
    };
    

    const updatedInfo = await dogOwnerCollection.updateOne(
      { email: email },
      { $set: oldcustomer }
    );
    //console.log(updatedInfo)
    if (updatedInfo.modifiedCount === 0) {
      throw "customer already upto date";
    }

    obj["userUpdated"] = true;

    return obj;
  },

  async UpdateDog(
    dog_name,
    dog_gender,
    email,
    dog_breed,
    dog_dob,
    vet_name,
    vet_phn,
    weight,
    behavioral_information
  ) {
    if (!dog_name) {
      throw "You must provide dog name";
    }

    if (!dog_gender) {
      throw "You must provide dog gender";
    }
    if (!dog_breed) {
      throw "You must provide dog breed";
    }

    if (!dog_dob) {
      throw "You must provide dog date of birth";
    }

    if (typeof dog_name !== "string") {
      throw "dog name must be sting";
    }

    if (typeof dog_gender !== "string") {
      throw "dog gender must be sting";
    }

    if (typeof dog_dob !== "string") {
      throw "e-dog date of birth must be sting";
    }

    if (typeof vet_name !== "string") {
      throw "Veterinarian name must be sting";
    }

    if (typeof vet_phn !== "string") {
      throw "Veterinarian Phone Number must be sting";
    }

    if (typeof behavioral_information !== "string") {
      throw "Dog Behavioral Information must be sting";
    }

    if (dog_name.trim() === "") {
      throw "first name cannot be empty string";
    }
    if (dog_gender.trim() === "") {
      throw "last name cannot be empty string";
    }

    if (dog_breed.trim() === "") {
      throw "e-mail cannot be empty string";
    }
    if (dog_dob.trim() === "") {
      throw "phone numbe cannot be empty string";
    }
    if (weight.trim() === "") {
      throw "gender cannot be empty string";
    }

    var dobregex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (!dog_dob.valueOf().match(dobregex)) {
      throw "your date of bith format is incorrect";
    }

    if (vet_phn != "") {
      let phnregex =
        /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
      if (!vet_phn.valueOf().match(phnregex)) {
        throw "your veterinarian phone number format is incorrect";
      }
    }

    let obj = {};

    email = email.toLowerCase();

    const dogOwnerCollection = await dogOwners();
    let oldcustomer = {
      dog_name: dog_name.trim(),
      dog_gender: dog_gender.trim(),
      dog_breed: dog_breed.trim(),
      dog_dob: dog_dob.trim(),
      vet_name: vet_name.trim(),
      vet_phn: vet_phn.trim(),
      weight: weight.trim(),
      behavioral_information: behavioral_information.trim(),
    };

    const updatedInfo = await dogOwnerCollection.updateOne(
      { email: email },
      { $set: oldcustomer }
    );
    if (updatedInfo.modifiedCount === 0) {
      throw "info already uptodate";
    }

    obj["DogUpdated"] = true;

    return obj;
  },

  // async DeleteCustomer(email) {
  //   if (!email || email.trim() === "") throw " email not available";

  //   let oldSitterdetails = {
  //     active_status: 0,
  //   };

  //   const sitterCollection = await sitters();
  //   const sitterInfo = await sitterCollection.updateOne(
  //     { email: email },
  //     { $set: oldSitterdetails }
  //   );
  //   if (sitterInfo === null) throw "User not found";
  //   sitterInfo["sitterDeleted"] = true;

  //   return sitterInfo;
  // },
};
