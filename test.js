const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URL;
console.log('URI:', uri);

MongoClient.connect(uri)
  .then(client => { console.log('Connected!'); client.close(); })
  .catch(err => console.error('Connection error:', err));