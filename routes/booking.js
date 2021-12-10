const express = require("express");
const router = express.Router();
const data = require("../data");
const bookingData = data.booking;
const customerData = data.customer;
const sitterData = data.sitter;

router.post("/Createbooking", async (req, res) => {
  //Error handling
  console.log(req.body);
  try {
    const sitterdata = await sitterData.getSitterEmail(req.body.sitteremail);
    let sitter_id = sitterdata._id;
    console.log(sitterdata);
    const Ownerdata = await customerData.getDogownerEmail(
      req.session.user.email
    );
    let owner_id = Ownerdata._id;
    console.log(Ownerdata);

    let start_date_time = req.body.start_date_time;
    let end_date_time = req.body.end_date_time;
    let service = req.body.service;
    let service_charge = req.body.service_charge;

    const booking = await bookingData.createBooking(
      owner_id,
      sitter_id,
      start_date_time,
      end_date_time,
      service_charge,
      service
    );
    if (booking.BookingCreated == true) {
      return res.json({ booking: "Succesful" });
    }
  } catch (e) {
    return res.json({ message: "Cannot book for this date and time" });
  }
  //console.log(e.message);
});
router.get("/getsitterEmail/:email", async (req, res) => {
  try {
    const sitterdata = await sitterData.getSitterEmail(req.params.email);
    return res.json(sitterdata);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
