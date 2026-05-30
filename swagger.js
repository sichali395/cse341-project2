const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Movies & Reviews Media API',
    description: 'CSE341 Project 2 Part 2 CRUD Operations with OAuth Security integrations.'
  },
  // FORCES SWAGGER TO USE YOUR RENDER URL DOMAIN AUTOMATICALLY IN PRODUCTION
  host: process.env.RENDER_EXTERNAL_URL 
    ? process.env.RENDER_EXTERNAL_URL.replace(/^https?:\/\//, '') 
    : 'localhost:8080',
  schemes: ['https', 'http'] // Prioritizes secure HTTPS connections first
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
