const dbConnection = require('./mongoConnection');

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection.connectToDb();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

/* Now, you can list your collections here: */
module.exports = {
  dogOwners: getCollectionFn('dogOwners'),    // dogOwners entire information is stored in this collection
  sitters: getCollectionFn('sitters'),        // dogSitters entire information is stored in this collection
  bookings: getCollectionFn('bookings')       // booking information is stored in this collection
};
