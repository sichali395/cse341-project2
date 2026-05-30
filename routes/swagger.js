const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

// Serves the interactive Swagger UI interface assets
router.use('/', swaggerUi.serve);

// Configures Swagger UI to parse the compiled swagger.json document
router.get('/', swaggerUi.setup(swaggerDocument));

module.exports = router;
