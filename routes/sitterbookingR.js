const express = require("express");
const router = express.Router();
const data = require("../data");
const bookingData = data.booking;
const customerData = data.customer;
const sitterData = data.sitter;
const xss = require('xss');

router.get("/getsomebookings/:email", async (req, res) => {
  //send all requested bookings by sitter email
  //first get id sitter by email
  try {
    const sitterdata = await sitterData.getSitterEmail(xss(req.params.email));
    //console.log(sitterdata);
    if (sitterdata._id) {
      let id = sitterdata._id;
      //get Requested bookings by Sitter id
      const sitterbookings = await bookingData.GetbookingSitter(id);
      //console.log(sitterbookings);
      if (sitterbookings == false) {
        throw "No Bookings found";
      }
      return res.json(sitterbookings);
    } else {
      throw "Sitter not found";
    }
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get("/accept/:id", async (req, res) => {
  try {
    const accept = await bookingData.UpdateStatusBooking(
      xss(req.params.id),
      "Accepted"
    );
    console.log(accept);
    return res.json(accept);
  } catch (e) {
    return res.status(400).json(e);
  }
});
router.get("/rejected/:id", async (req, res) => {
  try {
    const accept = await bookingData.UpdateStatusBooking(
      xss(req.params.id),
      "Rejected"
    );
    return res.json(accept);
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.get("/review/:email", async (req, res) => {
  try {
    email = req.params.email;
    if (!email) {
      throw "No email found";
    }
    if (typeof email != "string") {
      throw "Email not string";
    }
    const accept = await sitterData.getreviews(xss(req.params.email));
    console.log(accept);
    return res.json(accept);
  } catch (e) {
    return res.status(400).json(e);
  }
});

module.exports = router;
