// Here we are connecting to MongoDB and importing the settings file
const MongoClient = require('mongodb').MongoClient;
const settings = require('./settings');
const mongoConfig = settings.mongoConfig;

let _connection = undefined;
let _db = undefined;
// MongoDB connections to MongoClient are performed here
module.exports = {
  connectToDb: async () => {
    if (!_connection) {
      _connection = await MongoClient.connect(mongoConfig.serverUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      
      _db = await _connection.db(mongoConfig.database);
    }
    // the database is returned here
    return _db;
  },
  // After the database is returned, we close the connection
  closeConnection: () => {
    _connection.close();
  }
};
