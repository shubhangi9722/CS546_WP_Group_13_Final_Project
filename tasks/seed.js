const dbConnection = require('../config/mongoConnections');
const data = require('../data/sitterData');

async function main() {

    //const db = await dbConnection();
    //await db.dropDatabase();
     
    const db = await dbConnection.connectToDb();
    //await db.dropDatabase();
    const users = await data.createSitter("Monica", "Geller", "12/11/1986", "mgeller@hotmail.com", "099-234-2464", "female", "Brooklyn, NY", "New York City", "NY", "11102", "12345678", "Dog Walking", "$40 per hour", "I am monica, I love to sit for dogs")
    console.log(users);
  
    dbConnection.closeconnection();
    //console.log('Done seeding database');
}

main();