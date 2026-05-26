const { MongoClient } = require('mongodb');
let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Database is already initialized!');
    return callback(null, _db);
  }

  // Diagnostic Log to trace environmental path availability
  if (!process.env.MONGODB_URI) {
    console.error('CRITICAL WARNING: process.env.MONGODB_URI is undefined!');
    console.error('Please verify your .env file is named exactly ".env" and sits in the root project folder.');
  } else {
    console.log('Environment string located successfully. Attempting handshake...');
  }

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Database has not been initialized. Call initDb first.');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};
