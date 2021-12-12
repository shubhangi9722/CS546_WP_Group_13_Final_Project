const mongoCollections = require("../config/mongoCollections");
const dogOwners = mongoCollections.dogOwners;
const sitters = mongoCollections.sitters;
const bookings = mongoCollections.bookings;
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const { ObjectId } = require("mongodb");

module.exports = [
    {
      _id: 0,
      username: "masterdetective123",
      firstName: "Sherlock",
      lastName: "Holmes",
      password: "elementarymydearwatson",
      hashedPassword: "$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.",
    },
    {
      _id: 1,
      username: "lemon",
      firstName: "Elizabeth",
      lastName: "Lemon",
      password: "damnyoujackdonaghy",
      hashedPassword: "$2a$16$SsR2TGPD24nfBpyRlBzINeGU61AH0Yo/CbgfOlU1ajpjnPuiQaiDm",
    },
    {
      _id: 2,
      username: "theboywholived",
      firstName: "Harry",
      lastName: "Potter",
      password: "quidditch",
      hashedPassword: "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK",
    },
  ]
  
  