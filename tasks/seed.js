const dbConnection = require("../config/mongoConnections");
const data = require("../data/sitterData");

async function main() {
  const db = await dbConnection.connectToDb();
  //await db.dropDatabase();
  const users = await data.createSitter(
    "Gregg",
    "Vesendor",
    "12/12/1965",
    "gvese@yahoo.com",
    "099-234-2464",
    "male",
    "56th Street, NY",
    "New York City",
    "NY",
    "11102",
    "12345678",
    "65",
    "I am gregg, all dog owners trust me with their dogs."
  );
  console.log(users);

  dbConnection.closeconnection();
  //console.log('Done seeding database');
}

main();
