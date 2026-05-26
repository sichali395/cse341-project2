require('dotenv').config();
const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const app = express();
const mongodb = require('./db/connect');
const port = process.env.PORT || 8080;

app.use(express.json());

// Session storage initialization configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport tracking states
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', require('./routes'));

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    status: status,
    message: err.message || 'A critical background execution fault occurred.'
  });
});

mongodb.initDb((err) => {
  if (err) {
    console.log('Database verification failed:', err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to cluster instance. Server reading port: ${port}`);
    });
  }
});