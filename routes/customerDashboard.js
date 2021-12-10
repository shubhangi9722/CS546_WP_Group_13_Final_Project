const express = require("express");
const router = express.Router();
const data = require("../data");
const bookingData = data.booking;
const CustomerData = data.customer;
var zipcodes = require("zipcodes");

router.get("/", async (req, res) => {
  try {
    if (req.session.user.usertype=="sitter" || !req.session.user) {
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

router.get("/getCustomerDetails/:email", async (req, res) => {
  if (!req.params.email) {
    res.status(400).json({ error: "You must provide email" });
    return;
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

  if (!rest_params.firstName) {
    res.status(400).json({ error: "You must provide first name" });
    return;
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

  if (!rest_params.dob) {
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
  if (rest_params.dob.trim() === "") {
    res.status(400).json({ error: "date of birth cannot be empty string" });
    return;
  }

  var emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!rest_params.email.valueOf().match(emailRegex)) {
    res.status(400).json({ error: "e-mail format is incorrect" });
    return;
  }

  var phnregex =
    /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  if (!rest_params.phone_number.valueOf().match(phnregex)) {
    res.status(400).json({ error: "your phone number format is incorrect" });
    return;
  }
  var zipvalid = /^\d{5}$/;
  if (!rest_params.zipcode.valueOf().match(zipvalid)) {
    res.status(400).json({ error: "your zipcode is incorrect" });
    return;
  }
  var dobregex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  if (!rest_params.dob.valueOf().match(dobregex)) {
    res.status(400).json({ error: "your date of bith format is incorrect" });
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
    res.status(500).send();
  }
});

router.post("/UpdateDog", async (req, res) => {
  const rest_params = req.body;

  if (!rest_params.dog_name) {
    res.status(400).json({ error: "You must provide dog name" });
    return;
  }

  if (!rest_params.dog_gender) {
    res.status(400).json({ error: "You must provide dog gender" });
    return;
  }
  if (!rest_params.dog_breed) {
    res.status(400).json({ error: "You must provide dog breed" });
    return;
  }

  if (!rest_params.dog_dob) {
    res.status(400).json({ error: "You must provide dog date of birth" });
    return;
  }

  if (!rest_params.weight) {
    res.status(400).json({ error: "You must dog weight" });
    return;
  }

  if (typeof rest_params.dog_name !== "string") {
    res.status(400).json({ error: "dog name must be sting" });
    return;
  }

  if (typeof rest_params.dog_gender !== "string") {
    res.status(400).json({ error: "dog gender must be sting" });
    return;
  }

  if (typeof rest_params.dog_breed !== "string") {
    res.status(400).json({ error: "dog breed must be sting" });
    return;
  }

  if (typeof rest_params.dog_dob !== "string") {
    res.status(400).json({ error: "dog date of birth must be sting" });
    return;
  }

  if (typeof rest_params.vet_name !== "string") {
    res.status(400).json({ error: "Veterinarian name must be sting" });
    return;
  }

  if (typeof rest_params.vet_phn !== "string") {
    res.status(400).json({ error: "Veterinarian Phone Number must be sting" });
    return;
  }

  if (typeof rest_params.behavioral_information !== "string") {
    res.status(400).json({ error: "Dog Behavioral Information must be sting" });
    return;
  }

  if (rest_params.dog_name.trim() === "") {
    res.status(400).json({ error: "dog name cannot be empty string" });
    return;
  }
  if (rest_params.dog_gender.trim() === "") {
    res.status(400).json({ error: "dog gender cannot be empty string" });
    return;
  }

  if (rest_params.dog_breed.trim() === "") {
    res.status(400).json({ error: "e-mail cannot be empty string" });
    return;
  }
  if (rest_params.dog_dob.trim() === "") {
    res.status(400).json({ error: "dog breed cannot be empty string" });
    return;
  }

  if (rest_params.weight.trim() === "") {
    res.status(400).json({ error: "dog weight cannot be empty string" });
    return;
  }

  var dobregex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  if (!rest_params.dog_dob.valueOf().match(dobregex)) {
    res
      .status(400)
      .json({ error: "your dog date of bith format is incorrect" });
    return;
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
    res.status(500).send();
  }
});


router.post('/getfiltersearchresult', async (req, res) => {
  const rest_params = req.body;
  try {
    const{serachterm,zipcode,rating,pricerange}=rest_params

    const searchreuslt = await CustomerData.filterresult(serachterm,zipcode,rating,pricerange);

    return res.json(searchreuslt);
  } catch (e) {
    res.status(500).send();
  }
}); 



router.post('/UpdateOwner', async (req, res) => {
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

  if (!rest_params.dob) {
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
  if (rest_params.dob.trim() === "") {
    res.status(400).json({ error: "date of birth cannot be empty string" });
    return;
  }

  var emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!rest_params.email.valueOf().match(emailRegex)) {
    res.status(400).json({ error: 
      "e-mail format is incorrect"
    });
    return;
  }

  var phnregex=/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/
  if (!rest_params.phone_number.valueOf().match(phnregex)) {
    res.status(400).json({ error: 
      "your phone number format is incorrect"
    });
    return;
  }
  var zipvalid=/^\d{5}$/
  if (!rest_params.zipcode.valueOf().match(zipvalid)) {
    res.status(400).json({ error: 
      "your zipcode is incorrect"
    });
    return;
  }
  var dobregex=/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/
  if (!rest_params.dob.valueOf().match(dobregex)) {
    res.status(400).json({error: "your date of bith format is incorrect" });
    return
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
      zipcode
    } = rest_params;

    var zipcitystate= zipcodes.lookup(zipcode);
    if (zipcitystate===null|| zipcitystate===undefined)
    {
      throw 'Your Zipcode does not have any related city or state'
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
      dob,
    );

     return res.json(rest);
    
  } 
  catch (e) {
    
    res.status(500).send();
  }
}); 


router.post('/UpdateDog', async (req, res) => {
  const rest_params = req.body;
 
  if (!rest_params.dog_name) {
    res.status(400).json({ error: "You must provide dog name" });
    return ;
  }

  if (!rest_params.dog_gender) {
    res.status(400).json({ error: "You must provide dog gender" });
    return;
  }
  if (!rest_params.dog_breed) {
    res.status(400).json({ error: "You must provide dog breed" });
    return;
  }

  if (!rest_params.dog_dob) {
    res.status(400).json({ error: "You must provide dog date of birth" });
    return;
  }

  if (!rest_params.weight) {
    res.status(400).json({ error: "You must dog weight" });
    return;
  }

  if (typeof rest_params.dog_name !== "string") {
    res.status(400).json({ error: "dog name must be sting" });
    return;
  }

  if (typeof rest_params.dog_gender !== "string") {
    res.status(400).json({ error: "dog gender must be sting" });
    return;
  }

  if (typeof rest_params.dog_breed !== "string") {
    res.status(400).json({ error: "dog breed must be sting" });
    return;
  }

  if (typeof rest_params.dog_dob !== "string") {
    res.status(400).json({ error: "dog date of birth must be sting" });
    return;
  }


  if (typeof rest_params.vet_name !== "string") {
    res.status(400).json({ error: "Veterinarian name must be sting" });
    return;
  }


  if (typeof rest_params.vet_phn !== "string") {
    res.status(400).json({ error: "Veterinarian Phone Number must be sting" });
    return;
  }

  
  if (typeof rest_params.behavioral_information !== "string") {
    res.status(400).json({ error: "Dog Behavioral Information must be sting" });
    return;
  }


  if (rest_params.dog_name.trim() === "") {
    res.status(400).json({ error: "dog name cannot be empty string" });
    return;
  }
  if (rest_params.dog_gender.trim() === "") {
    res.status(400).json({ error: "dog gender cannot be empty string" });
    return;
  }

  if (rest_params.dog_breed.trim() === "") {
    res.status(400).json({ error: "e-mail cannot be empty string" });
    return;
  }
  if (rest_params.dog_dob.trim() === "") {
    res.status(400).json({ error: "dog breed cannot be empty string" });
    return;
  }

  if (rest_params.weight.trim() === "") {
    res.status(400).json({ error: "dog weight cannot be empty string" });
    return;
  }


  var dobregex=/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/
  if (!rest_params.dog_dob.valueOf().match(dobregex)) {
    res.status(400).json({error: "your dog date of bith format is incorrect" });
    return
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
      behavioral_information
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
    
  } 
  catch (e) {
    
    res.status(500).send();
  }
}); 


module.exports = router;