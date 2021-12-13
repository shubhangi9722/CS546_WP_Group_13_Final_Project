// This File contaings functions without error handling
// const mongoCollections = require("../config/mongoCollections");
// const dogOwners = mongoCollections.dogOwners;
// const sitters = mongoCollections.sitters;
// const bookings = mongoCollections.bookings;
// const { ObjectId } = require("mongodb");
// const moment = require("moment");

// module.exports = {
//   async createBooking(
//     owner_id,
//     sitter_id,
//     start_date_time,
//     end_date_time,
//     service_charge,
//     service
//   ) {
//     let s = moment(start_date_time);
//     let e = moment(end_date_time);
//     const booking = {
//       Owner_id: owner_id,
//       Sitter_id: sitter_id,
//       start_date_time: s.toISOString(),
//       end_date_time: e.toISOString(),
//       status: "Requested",
//       service_charge: service_charge,
//       service: service,
//     };
//     const bookingsCollection = await bookings();
//     const insertInfo = await bookingsCollection.insertOne(booking);
//     if (insertInfo.insertedCount === 0)
//       throw new Error("Could not add booking");
//   },
// };
