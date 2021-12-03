const mongoCollections = require("../config/mongoCollections");
const dogOwners = mongoCollections.dogOwners;
const sitters = mongoCollections.sitters;
const bookings = mongoCollections.bookings;
const { ObjectId } = require("mongodb");
const moment = require("moment");

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

module.exports = {
  async createBooking(
    owner_id,
    sitter_id,
    start_date_time,
    end_date_time,
    service_charge,
    service
  ) {
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
    if (typeof service_charge !== "string") {
      throw "Service Charge not a valid string";
    }
    if (typeof service !== "string") {
      throw "Service not a valid string";
    }
    if (service_charge.charAt(0) !== "$") {
      throw "Service charge not a valid string";
    }

    service_charge.replace("$", "");
    let services = ["dog walking", "house visit", "day care", "night care"];
    var currency_value = parseFloat(service_charge.substr(1));
    start_date_time.replace("T", " ");
    end_date_time.replace("T", " ");
    let s = moment(start_date_time);
    let e = moment(end_date_time);
    if (s.isValid() == false || e.isValid() == false) {
      throw "start date or end date is not valid";
    }
    if (moment(start_date_time).isAfter(end_date_time)) {
      throw "Start date and time cannnot be after end date and time";
    }
    if (service == services[0]) {
      if (!s.isSame(e, "date")) {
        throw "Dates cannot be different";
      }
      console.log(e.diff(s) / 60000);
      if (e.diff(s) / 60000 < 30) {
        throw "time should be minimum 30mins";
      }
      if (currency_value > 30.0 || currency_value < 20.0) {
        throw "service charge not valid";
      }
    } else if (service == services[1]) {
      if (currency_value > 100.0 || currency_value < 10.0) {
        throw "service charge not valid";
      }
      if (moment(start_date_time).isAfter(end_date_time)) {
        throw "Start date and time cannnot be after end date and time";
      }
      if (s.isSame(e, "date")) {
        if (e.diff(s) / 60000 < 60) {
          throw "time should be minimum 60mins";
        }
      }
      currency_value = (currency_value * (e.diff(s) / 60000)) / 60;
      service_charge = `$${currency_value}`;
    } else if (service == services[2]) {
      if (currency_value > 300.0 || currency_value < 50.0) {
        throw "service charge not valid";
      }
      if (!s.isSame(e, "date")) {
        throw "Dates cannot be different";
      }
      if (!s.isSame("10:00", "time")) {
        throw "day care starts at 10am";
      }
      if (!e.isSame("20:00", "time")) {
        throw "day care ends at 8pm";
      }
    } else if (service == services[3]) {
      if (currency_value > 300.0 || currency_value < 50.0) {
        throw "service charge not valid";
      }
      if (s.isSame(e, "date")) {
        throw "Dates cannot be same";
      }
      if (moment(start_date_time).isAfter(end_date_time)) {
        throw "Start date and time cannnot be after end date and time";
      }
      if (s.diff(e, "date") !== -86400000) {
        throw "Date must be consecutive";
      }
      if (!s.isSame("20:00", "time")) {
        throw "night care starts at 8pm";
      }
      if (!e.isSame("08:00", "time")) {
        throw "day care ends at 08am";
      }
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
    return { BookingCreated: true };
  },

  async GetbookingSitter(sitter_id) {
    if (!sitter_id) {
      throw "sitter id not found";
    }
    if (!isSitter_id(sitter_id)) {
      throw new Error(`id ${sitter_id} is not Valid`);
    }
    const bookingsCollection = await bookings();
    const b = await bookingsCollection.find({ Sitter_id: sitter_id }).toArray();
    if (b.length == 0) {
      throw "Booking doesnot exists";
    }
    for (x of b) {
      x.start_date_time = moment(x.start_date_time).format("YYYY-MM-DD HH:mm");
      x.end_date_time = moment(x.end_date_time).format("YYYY-MM-DD HH:mm");
    }
    return b;
  },

  async GetbookingOwner(owner_id) {
    if (!owner_id) {
      throw "owner id not found";
    }
    if (!isOwner_id(owner_id)) {
      throw new Error(`id ${owner_id} is not Valid`);
    }
    const bookings = await bookingsCollection
      .find({ Owner_id: owner_id })
      .toArray();
    if (bookings.length !== 0) {
      throw "Booking already exists";
    }
    for (x of bookings) {
      x.start_date_time = moment(x.start_date_time)
        .add(30, "minutes")
        .format("YYYY-MM-DD HH:mm");
      x.end_date_time = moment(x.end_date_time)
        .subtract(30, "minutes")
        .format("YYYY-MM-DD HH:mm");
    }
    return bookings;
  },

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
      throw new Error("booking_id not a string");
    }
    let parsedId;
    try {
      parsedId = ObjectId(booking_id);
    } catch (err) {
      throw new Error(`id ${booking_id} is not a valid ObjectId.`);
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
    if (updatedInfo.modifiedCount === 0) {
      throw new Error("Could not update Booking");
    }
    return { Update: true };
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
    return { BookingId: booking._id.toString(), deleted: true };
  },
};