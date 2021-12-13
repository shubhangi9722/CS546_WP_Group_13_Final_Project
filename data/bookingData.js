const mongoCollections = require("../config/mongoCollections");
const dogOwners = mongoCollections.dogOwners;
const sitters = mongoCollections.sitters;
const bookings = mongoCollections.bookings;
const { ObjectId } = require("mongodb");
const moment = require("moment");
var nodemailer = require("nodemailer");

async function isOwner_id(Owner_id) {
  if (typeof Owner_id !== "string") {
    throw new Error("Owner id not a string");
  }
  let parsedId;
  try {
    parsedId = ObjectId(Owner_id);
  } catch (err) {
    throw new Error(`id ${Owner_id} is not a valid ObjectId.`);
  }
  const dogOwnerCollection = await dogOwners();
  const addedUser = await dogOwnerCollection.findOne({ _id: parsedId });
  if (addedUser !== null) {
    return true;
  }
  return false;
}

async function isSitter_id(Sitter_id) {
  if (typeof Sitter_id !== "string") {
    throw new Error("Sitter id not a string");
  }
  let parsedId;
  try {
    parsedId = ObjectId(Sitter_id);
  } catch (err) {
    throw new Error(`id ${Sitter_id} is not a valid ObjectId.`);
  }
  const sitterCollection = await sitters();
  const addedUser = await sitterCollection.findOne({ _id: parsedId });
  if (addedUser !== null) {
    return true;
  }
  return false;
}
async function getSitterNameId(id) {
  if (typeof id !== "string") {
    throw new Error("Sitter id not a string");
  }
  let parsedId;
  try {
    parsedId = ObjectId(id);
  } catch (err) {
    throw new Error(`id ${id} is not a valid ObjectId.`);
  }
  const sitterCollection = await sitters();
  const addedUser = await sitterCollection.findOne({ _id: parsedId });
  let Sitterdata = {};
  if (addedUser !== null) {
    Sitterdata["firstName"] = addedUser.firstName;
    Sitterdata["lastName"] = addedUser.lastName;
    Sitterdata["OverallRating"] = addedUser.overall_rating;
    return Sitterdata;
  }
  return false;
}
async function getOwnerNameId(id) {
  if (typeof id !== "string") {
    throw new Error("Sitter id not a string");
  }
  let parsedId;
  try {
    parsedId = ObjectId(id);
  } catch (err) {
    throw new Error(`id ${id} is not a valid ObjectId.`);
  }
  const sitterCollection = await dogOwners();
  const addedUser = await sitterCollection.findOne({ _id: parsedId });
  if (addedUser !== null) {
    delete addedUser._id;
    delete addedUser.password;
    return addedUser;
  }
  return false;
}
async function sendEmail(booking_id, status) {
  //get dog owner id
  let parsedid;
  try {
    parsedid = ObjectId(booking_id);
  } catch (err) {
    throw new Error(`id ${id} is not a valid ObjectId.`);
  }
  const bookingsCollection = await bookings();
  const booking = await bookingsCollection.findOne({ _id: parsedid });
  id = booking.Owner_id;
  //get dogownermail
  let parsedId;
  try {
    parsedId = ObjectId(id);
  } catch (err) {
    throw new Error(`id ${id} is not a valid ObjectId.`);
  }
  const OwnerCollection = await dogOwners();
  const addedUser = await OwnerCollection.findOne({ _id: parsedId });
  const emailid = addedUser.email;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "saidexter2021@gmail.com",
      pass: "Smarty97",
    },
  });
  booking.start_date_time = moment(booking.start_date_time);
  booking.end_date_time = moment(booking.end_date_time);

  var mailOptions = {
    from: "bowwowsitters362@gmail.com",
    to: emailid,
    subject: "Regarding your request on BOW-WOW-Sitters",
    text: `Your request to book a sitter for ${booking.start_date_time} to ${booking.end_date_time} has been ${status}`,
  };
  //try {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log("Email sent: " + info.response);
      return true;
    }
  });
}

async function sendEmailToSitter(sitter_id) {
  //get Sitter  id
  let parsedid;
  try {
    parsedid = ObjectId(sitter_id);
  } catch (err) {
    throw new Error(`id ${id} is not a valid ObjectId.`);
  }
  const sitterCollection = await sitters();
  const addedUser = await sitterCollection.findOne({ _id: parsedid });
  const emailid = addedUser.email;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "saidexter2021@gmail.com",
      pass: "Smarty97",
    },
  });
  var mailOptions = {
    from: "bowwowsitters362@gmail.com",
    to: emailid,
    subject: "Regarding your request on BOW-WOW-Sitters",
    text: `New Request created for your service on Bow-wow Sitters`,
  };
  //try {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log("Email sent: " + info.response);
      return true;
    }
  });
}

module.exports = {
  async createBooking(
    owner_id,
    sitter_id,
    start_date_time,
    end_date_time,
    service_charge,
    service
  ) {
    //   console.log({
    //     owner_id,
    //     sitter_id,
    //     start_date_time,
    //     end_date_time,
    //     service_charge,
    //     service,
    //   });
    if (!owner_id) {
      throw "Owner id not found";
    }
    if (!sitter_id) {
      throw "sitter id not found";
    }
    if (!start_date_time) {
      throw "start date time not found";
    }
    if (!end_date_time) {
      throw "end date time not found";
    }
    if (!service_charge) {
      throw "service charge not found";
    }
    if ((await isOwner_id(owner_id)) == false) {
      throw new Error(`id ${owner_id} is not Valid`);
    }
    if ((await isSitter_id(sitter_id)) == false) {
      throw new Error(`id ${sitter_id} is not Valid`);
    }
    if (typeof service_charge !== "number") {
      throw "Service Charge not a valid string";
    }
    if (typeof service !== "string") {
      throw "Service not a valid string";
    }
    // if (service_charge.charAt(0) !== "$") {
    //   throw "Service charge not a valid string";
    // }

    //service_charge.replace("$", "");
    let services = ["DogWalking", "Housevisit", "Daycare", "Nightcare"];

    //dogwalking 30min Checkindate startdate
    //housevisit date-time
    //daycare checkindate  10am to 8pm
    //nigthcare checkindate 8pm to 8am

    let currency_value = service_charge;
    start_date_time = start_date_time.toString();
    end_date_time = end_date_time.toString();
    // start_date_time.replace("/", "-");
    // end_date_time.replace("/", "-");
    let s = moment(new Date(start_date_time));
    let e = moment(new Date(end_date_time));
    let now = moment();
    if (moment(s).isBefore(now)) {
      throw "please select future Start date and time ";
    }
    if (s.isValid() == false || e.isValid() == false) {
      throw "start date or end date is not valid";
    }
    if (moment(new Date(start_date_time)).isAfter(new Date(end_date_time))) {
      throw "Start date and time cannnot be after end date and time";
    }
    if (service == services[0]) {
      currency_value = currency_value / 2;
      currency_value = parseFloat(currency_value).toFixed(2);
      service_charge = `$${currency_value}`;

      if (!s.isSame(e, "date")) {
        throw "Dates cannot be different";
      }
      console.log(e.diff(s) / 60000);
      if (e.diff(s) / 60000 < 30) {
        throw "time should be minimum 30mins";
      }
    } else if (service == services[1]) {
      if (moment(start_date_time).isAfter(end_date_time)) {
        throw "Start date and time cannnot be after end date and time";
      }
      if (s.isSame(e, "date")) {
        if (e.diff(s) / 60000 < 60) {
          throw "time should be minimum 60mins";
        }
      }
      currency_value = (currency_value * (e.diff(s) / 60000)) / 60;
      currency_value = parseFloat(currency_value).toFixed(2);
      service_charge = `$${currency_value}`;
      console.log(service_charge);
    } else if (service == services[2]) {
      // if (currency_value > 300.0 || currency_value < 50.0) {
      //   throw "service charge not valid";
      // }
      console.log(s);
      console.log(e);
      currency_value = parseFloat(currency_value).toFixed(2);
      service_charge = `$${currency_value * 10}`;
      if (!s.isSame(e, "date")) {
        throw "Dates cannot be different";
      }
      // if (!s.isSame("10:00", "time")) {
      //   throw "day care starts at 10am";
      // }
      // if (!e.isSame("20:00", "time")) {
      //   throw "day care ends at 8pm";
      // }
    } else if (service == services[3]) {
      // if (currency_value > 300.0 || currency_value < 50.0) {
      //   throw "service charge not valid";
      // }
      currency_value = parseFloat(currency_value).toFixed(2);
      service_charge = `$${currency_value * 12}`;
      if (s.isSame(e, "date")) {
        throw "Dates cannot be same";
      }
      // if (moment(start_date_time).isAfter(end_date_time)) {
      //   throw "Start date and time cannnot be after end date and time";
      // }
      // if (s.diff(e, "date") !== -86400000) {
      //   throw "Date must be consecutive";
      // }
      // if (!s.isSame("20:00", "time")) {
      //   throw "Night care starts at 8pm";
      // }
      // if (!e.isSame("08:00", "time")) {
      //   throw "Night care ends at 08am";
      // }
    } else {
      throw "Service not valid";
    }
    e.add(30, "minutes");
    s.subtract(30, "minutes");
    const bookingsCollection = await bookings();
    const sitterbooking = await bookingsCollection
      .find({
        Sitter_id: sitter_id,
        start_date_time: { $gt: s.toISOString() },
        end_date_time: { $lt: e.toISOString() },
      })
      .toArray();

    if (sitterbooking.length !== 0) {
      throw "Booking already exists sitter";
    }
    const ownerbookings = await bookingsCollection
      .find({
        Owner_id: owner_id,
        start_date_time: { $gt: s.toISOString() },
        end_date_time: { $lt: e.toISOString() },
      })
      .toArray();
    if (ownerbookings.length !== 0) {
      throw "Booking already exists";
    }

    e.subtract(30, "minutes");
    s.add(30, "minutes");
    const booking = {
      Owner_id: owner_id,
      Sitter_id: sitter_id,
      start_date_time: s.toISOString(),
      end_date_time: e.toISOString(),
      status: "Requested",
      service_charge: service_charge,
      service: service,
    };
    const insertInfo = await bookingsCollection.insertOne(booking);
    if (insertInfo.insertedCount === 0)
      throw new Error("Could not add booking");
    console.log(insertInfo);
    sendEmailToSitter(sitter_id);
    return { BookingCreated: true };
  },

  /////////////////////////////////////////////////////////////////////////////////////////////
  async GetbookingSitter(sitter_id) {
    try {
      if (!sitter_id) {
        throw "sitter id not found";
      }
      if (!isSitter_id(sitter_id)) {
        throw new Error(`id ${sitter_id} is not Valid`);
      }
      const bookingsCollection = await bookings();
      const b = await bookingsCollection
        .find({ Sitter_id: sitter_id })
        .toArray();
      if (b.length == 0) {
        throw "Booking does not exists";
      }
      let bOwner = [];
      for (x of b) {
        x.start_date_time = moment(x.start_date_time).format(
          "YYYY-MM-DD HH:mm"
        );
        x.end_date_time = moment(x.end_date_time).format("YYYY-MM-DD HH:mm");
        x.end_date_time = moment(x.end_date_time).format("YYYY-MM-DD HH:mm");
        let addedUser = await getOwnerNameId(x.Owner_id);
        if (addedUser == false) {
          throw "No Owner found";
        }
        let obj = {
          ...x,
          ...addedUser,
        };
        bOwner.push(obj);
      }
      return bOwner;
    } catch (e) {
      return false;
    }
  },

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  async GetbookingOwner(owner_id) {
    try {
      if (!owner_id) {
        throw "owner id not found";
      }
      if (!isOwner_id(owner_id)) {
        throw new Error(`id ${owner_id} is not Valid`);
      }
      const bookingsCollection = await bookings();
      const b = await bookingsCollection.find({ Owner_id: owner_id }).toArray();
      if (b.length === 0) {
        throw "No Bookings Found";
      }
      for (x of b) {
        x.start_date_time = moment(x.start_date_time).format(
          "YYYY-MM-DD HH:mm"
        );
        x.end_date_time = moment(x.end_date_time).format("YYYY-MM-DD HH:mm");
        let addedUser = await getSitterNameId(x.Sitter_id);
        x["firstName"] = addedUser.firstName;
        x["lastName"] = addedUser.lastName;
        x["OverallRating"] = addedUser.OverallRating;
      }
      return b;
    } catch (e) {
      console.log(e);
      return e;
    }
  },

  //////////////////////Status
  async UpdateStatusBooking(booking_id, status) {
    if (!status) {
      throw "status not present";
    }
    if (typeof status !== "string") {
      throw "Status should be a string";
    }
    if (
      status !== "Accepted" &&
      status !== "Rejected" &&
      status !== "Completed"
    ) {
      throw "Not valid status";
    }
    if (!booking_id) {
      throw "booking_id not found";
    }
    if (typeof booking_id !== "string") {
      throw "booking_id not a string";
    }
    let parsedId;
    try {
      parsedId = ObjectId(booking_id);
    } catch (err) {
      throw `id ${booking_id} is not a valid ObjectId.`;
    }
    let updatedBooking = {
      status: status,
    };

    const bookingsCollection = await bookings();
    const booking = await bookingsCollection.findOne({ _id: parsedId });
    if (booking.status === status) {
      throw `Status is already ${status}`;
    }
    if (booking === null) throw new Error(`No booking exists with id`);
    const updatedInfo = await bookingsCollection.updateOne(
      { _id: parsedId },
      { $set: updatedBooking }
    );
    console.log(updatedBooking);
    if (updatedInfo.modifiedCount === 0) {
      throw "Could not update Booking";
    }
    const mail = await sendEmail(booking_id, status);
    // if (mail == false) {
    //   console.log("could not send Email");
    // }
    let obj = {};
    obj["updated"] = true;
    console.log(obj);
    return obj;
  },

  async delete(booking_id) {
    if (!booking_id) {
      throw "booking_id not found";
    }
    if (typeof booking_id !== "string") {
      throw new Error("booking_id not a string");
    }
    let parsedId;
    try {
      parsedId = ObjectId(booking_id);
    } catch (err) {
      throw new Error(`id ${booking_id} is not a valid ObjectId.`);
    }
    const bookingsCollection = await bookings();
    const booking = await bookingsCollection.findOne({ _id: parsedId });
    console.log(booking);
    if (booking === null) throw new Error(`No booking exists with idfgfhgjh`);
    const deletionInfo = await bookingsCollection.deleteOne({ _id: parsedId });
    if (deletionInfo.deletedCount === 0)
      throw new Error(`No Booking exists with id`);
    let obj = {};
    obj["BookingId"] = booking._id.toString();
    obj["Delete"] = true;
    return obj;
  },

  async getDogOwnerEmail(email) {
    email = email.trim();

    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.valueOf().match(emailRegex)) {
      throw "e-mail format is incorrect";
    }

    const OwnerCollection = await dogOwners();
    const addedUser = await OwnerCollection.findOne({
      email: email.toLowerCase(),
    });
    if (addedUser === null) throw "User does not exists";
    delete addedUser.password;
    //addedUser.password = "";
    addedUser._id = addedUser._id.toString();
    return addedUser;
  },

  async sitterReviews(emailId, b_id, sitterId, rating, review) {
    // console.log(emailId);
    // console.log(sitterId)
    // console.log(rating);
    // console.log(review);

    const sittersCollection = await sitters();
    let obj = {};
    let objectId = new ObjectId(sitterId);
    const getSitter = await sittersCollection.findOne({
      _id: objectId,
    });

    if (getSitter === null) throw [404, `Sitter Not Found with id:${sitterId}`];
    //return;

    let createReview = {
      _id: ObjectId(),

      bookingID: b_id,
      customerEmail: emailId,
      rating: parseInt(rating), /////////////////////////////
      review: review, /////////////////////////////////
    };

    let sum = 0;
    //  let reviewLength = getSitter.reviews.length  < 1 ? 1: getSitter.reviews.length;
    console.log(getSitter);
    for (let i = 0; i < getSitter.reviews.length; i++) {
      sum += getSitter.reviews[i].rating;
    }
    //console.log(sum);
    // console.log(createReview.rating);
    // console.log(getSitter.reviews.length);
    let average = (sum + createReview.rating) / (getSitter.reviews.length + 1);
    console.log(getSitter.reviews.length + 1, "1");
    //console.log(average);
    average = Number(average.toFixed(2));

    const updatedreviews = await sittersCollection.updateOne(
      { _id: objectId },
      { $push: { reviews: createReview }, $set: { overall_rating: average } }
    );

    if (!updatedreviews.matchedCount && !updatedreviews.modifiedCount) {
      throw [500, "Could not update reviews successfully"];
    }

    obj["reviewInserted"] = true;

    return obj;
  },
};
