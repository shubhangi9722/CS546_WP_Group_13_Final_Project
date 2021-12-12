const express = require("express");
const router = express.Router();
const data = require("../data");
const bookingData = data.booking;
const customerData = data.customer;
const sitterData = data.sitter;
const xss = require('xss');

router.post("/Createbooking", async (req, res) => {
  //Error handling
  //console.log(req.body);
  try {
    //console.log(req.session.user.email);
    const sitterdata = await sitterData.getSitterEmail(xss(req.body.sitteremail));
    let sitter_id = sitterdata._id;
    //console.log(sitterdata);
    const Ownerdata = await bookingData.getDogOwnerEmail(
      xss(req.session.user.email)
    );
    let owner_id = Ownerdata._id;
    //console.log(Ownerdata);

    let start_date_time = req.body.start_date_time;
    let end_date_time = req.body.end_date_time;
    let service = xss(req.body.service);
    let service_charge = xss(req.body.service_charge);

    const booking = await bookingData.createBooking(
      owner_id,
      sitter_id,
      start_date_time,
      end_date_time,
      service_charge,
      service
    );
    if (booking.BookingCreated == true) {
      return res.json({ booking: "Successful" });
    }
  } catch (e) {
    return res.json({ message: "Cannot book for this date and time" });
  }
  //console.log(e.message);
});

//Sitter details
router.get("/getsitterEmail/:email", async (req, res) => {
  try {
    const sitterdata = await sitterData.getSitterEmail(xss(req.params.email));
    return res.json(sitterdata);
  } catch (e) {
    res.status(500).send();
  }
});

//Owner details
router.get("/getOwnerEmail/:email", async (req, res) => {
  try {
    const sitterdata = await bookingData.getDogOwnerEmail(xss(req.params.email));
    return res.json(sitterdata);
  } catch (e) {
    res.status(500).send();
  }
});
//All Booking
router.get("/owner/:id", async (req, res) => {
  try {
    let owner_id = req.params.id;
    console.log(owner_id);
    const sitterdata = await bookingData.GetbookingOwner(owner_id);
    if (sitterdata == "No Bookings found") {
      throw "No Bookings found";
    }
    return res.json(sitterdata);
  } catch (e) {
    if (e.message.includes("No Bookings found")) {
      return res.status(404).json({ bookings: false });
    }
    return res.status(500).send();
  }
});


router.post("/sittersReview", async (req, res) => {
  //Error handling
  try{
    console.log(req.body);
   // console.log(req.session.user.email)
    const Ownerdata = await bookingData.sitterReviews(

      xss(req.session.user.email),
       xss(req.body.b_id),
      xss(req.body.sitter_id), 
      xss(req.body.ratingValue), 
      xss(req.body.reviewValue)

    );
    return res.json(Ownerdata);
   // console.log(Ownerdata)
  }
 catch(e) {

 }

});


module.exports = router;
