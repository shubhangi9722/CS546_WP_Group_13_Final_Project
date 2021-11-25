const mongoCollections = require('../config/mongoCollections');
const dogOwners = mongoCollections.dogOwners;
const bcrypt = require('bcryptjs');
const saltRounds = 16;
const { ObjectId } = require('mongodb');

module.exports={
  //validate login
async checkCustomer(email, password)
        {
            if (!email|| !password ) 
        {
          throw 'All fields need to have valid values';
        }

        if(typeof email!=='string')
        {
          throw 'input value of username is not a string ';
        }
        if(typeof password!=='string')
        {
          throw 'input value of password is not a string';
        }

        
        
        if ( email.trim() === '') throw 'name cannot be empty string';
        if ( password.trim() === '') throw 'location cannot be empty string';
        
     
        let obj={}

        const dogOwnerCollection = await dogOwners();
        const addedUser = await dogOwnerCollection.findOne({ email: email.toLocaleLowerCase()});
        let compareToMatch = false;
        if (addedUser !== null)
        {
         const pass= addedUser.password;
         compareToMatch = await bcrypt.compare(password, pass);
        }
        else 
        {
          throw'Either the username or password is invalid'
        }
        
        obj['authenticated'] = true;

        if(compareToMatch)
        {
          return obj;
        }

       else{
        throw'Either the username or password is invalid'
       }
        },

        

      //create Customer
      async createCustomer(
        firstName,
        lastName,
        email,
        phone_number,
        gender,
        adress,
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
      ){

        if (!firstName) {
          throw "You must provide first name"
        }
      
        if (!lastName) {
          throw "You must provide last name"
        }
        if (!email) {
          throw "You must provide e-mail"
        }
      
        if (!phone_number) {
          throw "You must provide phone number"
        }
      
        if (!gender) {
          throw "You must provide gender"
        }
      
        if (!adress) {
          throw "You must provide adress"
        }
      
        if (!city) {
          throw "You must provide city"
        }
      
        if (!state) {
          throw "You must provide state"
        }
      
        if (!zipcode) {
          throw "You must provide zipcode"
        }
      
        if (!dob) {
          throw "You must provide age"
        }
      
        if (!password) {
          throw "You must provide password"
        }
      
        if (!dog_name) {
          throw "You must provide dog's name"
        }
      
        if (!dog_gender) {
          throw "You must provide dog's gender"
        }
      
        if (!dog_breed) {
          throw "You must provide dog's breed"
        }
      
        if (!dog_dob) {
          throw "You must provide dog's date of birth"
        }
      
        if (!weight) {
          throw "You must provide dog's weight"
        }
      
        if (typeof firstName !== "string") {
          throw "first name must be sting"
        }
      
        if (typeof lastName !== "string") {
          throw "last name must be sting"
        }
      
        if (typeof email !== "string") {
          throw "e-mail must be sting"
        }
      
        if (typeof phone_number !== "string") {
          throw "phone number must be sting"
        }
      
        if (typeof gender !== "string") {
          throw "gender must be sting"
        }
      
        if (typeof address !== "string") {
          throw "address must be sting"
        }
      
        if (typeof city !== "string") {
          throw "city must be sting"
        }
      
        if (typeof state !== "string") {
          throw "state must be sting"
        }
      
        if (typeof zipcode !== "string") {
          throw "zipcode must be sting"
        }
      
        if (typeof age !== "string") {
          throw "age must be sting"
        }
      
        if (typeof password !== "string") {
          throw "password must be sting"
        }
      
        if (typeof dog_name !== "string") {
          throw "dog's name must be sting"
        }
      
        if (typeof dog_gender !== "string") {
          throw "dog's gender must be sting"
        }
      
        if (typeof dog_breed !== "string") {
          throw "dog's breed must be sting"
        }
      
        if (typeof dog_age === "string") {
          throw "dog's age must be number"
        }
      
        if (typeof dog_dob !== "string") {
          throw "dog's date of birth must be sting"
        }
      
        if (typeof vet_name !== "string") {
          throw "vet name must be sting"
        }
      
        if (typeof vet_phn !== "string") {
          throw "vet phone number must be sting"
        }
      
        if (typeof weight === "string") {
          throw "weight must be number"
        }
      
        if (typeof behavioral_information !== "string") {
          throw "dog's behavioral_information must be sting"
        }
      
        if (firstName.trim() === "") {
          throw "first name cannot be empty string"
        }
        if (lastName.trim() === "") {
          throw "last name cannot be empty string"
        }
      
        if (email.trim() === "") {
          throw "e-mail cannot be empty string"
        }
        if (phone_number.trim() === "") {
          throw "phone numbe cannot be empty string"
        }
        if (gender.trim() === "") {
          throw "gender cannot be empty string"
        }
        if (adress.trim() === "") {
          throw "adress cannot be empty string"
        }
        if (city.trim() === "") {
          throw "city cannot be empty string"
        }
        if (state.trim() === "") {
          throw "state cannot be empty string"
        }
        if (zipcode.trim() === "") {
          throw "zipcode cannot be empty string"
        }
        if (dob.trim() === "") {
          throw "date of birth cannot be empty string"
        }
        if (password.trim() === "") {
          throw "password cannot be empty string"
        }
        if (dog_name.trim() === "") {
          throw "dog's name cannot be empty string"
        }
        if (dog_gender.trim() === "") {
          throw "dog's gender cannot be empty string"
        }
        if (dog_breed.trim() === "") {
          throw "dog's breed cannot be empty string"
        }
      
        if (dog_dob.trim() === "") {
          throw "dog's date of birth cannot be empty string"
        }
        if (weight.trim() === "") {
          throw " dog's weight cannot be empty string"
        }
      
        var emailRegex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email.valueOf().match(emailRegex)) {
          throw "e-mail format is incorrect"
  
        }
      
        var passRegex = /^[a-zA-Z0-9\-_]{6,40}$/;
        if (!password.valueOf().match(passRegex)) {
          throw  "passwor cannot have spaces,only alphanumeric characters and minimum of 6 characters long."

        }
        var phnregex=/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/
        if (!phone_number.valueOf().match(phnregex)) {
          throw "your phone number format is incorrect"
        
        }
        
     
        let obj={}

        const passhash = await bcrypt.hash(password, saltRounds);
        const dogOwnerCollection = await dogOwners();
        let newcustomer = {
          firstName:firstName,
          lastName:lastName,
          email:email.toLocaleLowerCase(),
          phone_number:phone_number,
          gender:gender,
          adress:adress,
          city:city,
          state:state,
          zipcode:zipcode,
          dob:dob,
          password:passhash,
          dog_name:dog_name,
          dog_gender:dog_gender,
          dog_breed:dog_breed,
          dog_age:dog_age,
          dog_dob:dog_dob,
          vet_name:vet_name,
          vet_phn:vet_phn,
          weight:weight,
          behavioral_information:behavioral_information 
        };

        const addedUser = await dogOwnerCollection.findOne({ email: email.toLocaleLowerCase() });
        if (addedUser !== null) throw 'User Already exists';
        const insertInfo = await dogOwnerCollection.insertOne(newcustomer);
        if (insertInfo.insertedCount === 0) throw 'Failed to add user';
        
        obj['userInserted'] = true;
        

        return obj;
      }

  
}
