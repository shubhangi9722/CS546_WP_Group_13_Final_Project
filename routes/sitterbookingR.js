const express = require("express");
const router = express.Router();
const data = require("../data");
const bookingData = data.booking;
const customerData = data.customer;
const sitterData = data.sitter;

router.get("/getsomebookings/:email", async (req, res) => {
  //send all requested bookings by sitter email
  //first get id sitter by email
  try {
    const sitterdata = await sitterData.getSitterEmail(req.params.email);
    console.log(sitterdata);
    if (sitterdata._id) {
      let id = sitterdata._id;
      //get Requested bookings by Sitter id
      const sitterbookings = await bookingData.GetbookingSitter(id);
      console.log(sitterbookings);
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
router.post("/accept/:id", async (req, res) => {
  try{
  const accept = await bookingData.UpdateStatusBooking(req.params.id, "Accepted");
  return res.json(accept)
  }
  catch(e)
  {
    return res.status(400).json(e)
  }
});

router.post("/rejected/:id", async (req, res) => {
  try{
  const accept = await bookingData.UpdateStatusBooking(req.params.id, "Rejected");
 return res.json(accept)
  }
  catch(e)
  {
    return res.status(400).json(e)
  }

});

module.exports = router;
