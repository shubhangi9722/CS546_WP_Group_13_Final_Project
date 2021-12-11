const dbConnection = require("../config/mongoConnections");
const data = require("../data/sitterData");
const dogOwners = require('../data/customerData');

async function main() {
  const db = await dbConnection.connectToDb();
    //await db.dropDatabase();

    /** seeding check customer function in dog owners database */
    // const check = await dogOwners.checkCustomer("wendyp22@gmail.com", "Illuminati123");
    // console.log(check);



    /** seeding check sitter function in sitter database */
    // const sit = await data.checkSitter("missycooper@gmail.com", "mcooper123");
    // console.log(sit);



    /** Seeding dog owners database */
    // const test = await dogOwners.createCustomer("Wendy", "Parker", "wendyp22@gmail.com", "555-769-3427", "Female", "106 Irving Street", "Jersey City", "New Jersey", "07307", "12/08/1978", "Illuminati123", "Rusty", "Male", "Golden Retriever", "06/15/2018", "Dr. Watson", "666-998-0060", "50lbs", "Scared of loud noises. He loves when someone taps on head");
    // console.log(test);

    // const test = await dogOwners.createCustomer("James", "Granger", "jamesGranger@yahoo.com", "508-886-5463", "Male", "909 Clinton Street", "Hoboken", "New Jersey", "07030", "11/22/1993", "IamBatman", "Bruno", "Male", "Pomeranian", "03/08/2019", "Dr. Tony Stark", "111-344-5005", "40lbs", "Tries to eat things and digs in the dirt. Bruno loves to cuddle");
    // console.log(test);

    // const test = await dogOwners.createCustomer("Jonas", "Miller", "miller877@hotmail.com", "209-433-9775", "Male", "33rd Street", "New York City", "New York", "10001", "08/30/1988", "IamWhatIam", "Daisy", "Female", "Poodle", "02/10/2021", "Dr. Benny", "003-544-9807", "30lbs", "Daisy hates to take bath. She loves to walk and listen to jazz music");
    // console.log(test);




    /*Seeding sitters database*/ 
    // const users = await data.createSitter("Gregg", "Vesendor", "12/12/1965", "gvese@yahoo.com", "099-234-2464", "male", "56th Street, NY", "New York City", "NY", "11102", "12345678", "65", "I am gregg, all dog owners trust me with their dogs.")
    // console.log(users);

    // const users = await data.createSitter("Missy", "Cooper", "01/23/1994", "missycooper@gmail.com", "444-674-0087", "Female", "66th Street, NY", "New York City", "NY", "10002", "mcooper123", "55", "I have two years sitters' experience. Also, I love spending time with dogs. Believe me, I will take good care of dogs.")
    // console.log(users);

    // const users = await data.createSitter("Phoebe", "Buffay", "07/11/1986", "phoebe@gmail.com", "556-999-0013", "Female", "2956, JFK", "Jersey City", "New Jersey", "07306", "myEyesmyEyes", "40", "I love to help others and love dogs. I am working as a part time sitter.")
    // console.log(users);

    // const users = await data.createSitter("Mosby", "kim", "02/26/1990", "kimm@yahoo.com", "667-850-6547", "Male", "14th Street, NY", "New York City", "NY", "10003", "123kim", "70", "I am specialized in this field with over 5 years. You can trust me with your dogs. Hope I live upto your expectations.")
    // console.log(users);

    // const users = await data.createSitter("Zhao", "Lu", "09/18/1996", "luzhao@yahoo.com", "112-458-0098", "Female", "Lincoln Street", "Jersey City", "New Jersey", "07307", "dancingBird", "60", "I am a professional sitter. I have received many good reviews from other dog owners.")
    // console.log(users);

    // const users = await data.createSitter("Anjali", "Kumar", "11/12/1994", "anju123@hotmail.com", "111-222-4433", "Female", "Jackson Street", "Hoboken", "New Jersey", "07030", "kumar334", "55", "I love to sit fo dogs. I am a masters student and working as a sitter for part time.")
    // console.log(users);




    /**seeding update function in dog owners databse */
    
    // const update = await dogOwners.UpdateOwner("Jonny", "Granger", "jamesGranger@yahoo.com", "666-000-4326", "Male", "47th Street", "New York City", "New York", "10005", "11/22/1994");
    // console.log(update);
  

    /**seeding update function for dog information in database */
    // const dog = await dogOwners.UpdateDog("Bailey", "Female", "miller877@hotmail.com", "Poodle", "02/10/2021", "Dr. Jason", "433-199-3300", "30lbs", "Bailey hates to take bath. She loves to walk and listen to jazz music");
    // console.log(dog);





    /** seeding update function in sitters database */
    // const sitter = await data.updateSitter("Xu", "Zhao", "luzhao@yahoo.com", "117-112-9988", "female", "Hudson Street", "Hoboken", "new Jersey", "07030", "50", "I love to sit fo dogs. I am a masters student and working as a sitter for part time. It will be a pleasure working as a sitter for your dog.")
    // console.log(sitter);
    
    

    /** seeding delete function in sitters database */
    // const del = await data.DeleteSitter("gvese@yahoo.com");
    // console.log(del);




    /** seeding check current dog owner information function in dog owner database */
    // const dogCheck = await dogOwners.getCuerrntCustomerInfo("wendyp22@gmail.com");
    // console.log(dogCheck);



    /** seeding check current sitter information function in sitter database */
    // const sitterCheck = await data.getCuerrntSitterInfo("anju123@hotmail.com");
    // console.log(sitterCheck);



    /** seeding filter function in dog owners database*/

    dbConnection.closeconnection();
    //console.log('Done seeding database');
}

main();
