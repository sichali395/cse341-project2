require('dotenv').config(); // <-- This MUST be line 1
const dns = require('node:dns'); // Line 2
dns.setServers(['1.1.1.1', '8.8.8.8']); // Line 3 - Forces Node to bypass local ISP blocks
const express = require('express');
const app = express();
const mongodb = require('./db/connect'); // <-- This MUST come after dotenv
const port = process.env.PORT || 8080;

// Parse incoming JSON payloads
app.use(express.json());

// Set loose CORS policy headers for external rendering tools
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Centralized application router connection point
app.use('/', require('./routes'));

// Global Error Handling Middleware (returns 400 or 500 status on execution crash)
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    status: status,
    message: err.message || 'A critical background execution fault occurred.'
  });
});

// Initialize connection with MongoDB Cluster and spin up application environment listener
mongodb.initDb((err) => {
  if (err) {
    console.log('Database verification failed:', err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to cluster instance. Server reading port: ${port}`);
    });
  }
});
