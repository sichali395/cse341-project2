const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Movies & Reviews Media API',
    description: 'CSE341 Project 2 Part 1 CRUD Operations and Middleware Validation.'
  },
  host: process.env.RENDER_EXTERNAL_URL ? process.env.RENDER_EXTERNAL_URL.replace(/^https?:\/\//, '') : 'localhost:8080', // Auto-switches on Render
  schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
