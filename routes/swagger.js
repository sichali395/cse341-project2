const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

// This middleware intercepts the swagger document and fixes the host link dynamically
router.use('/', (req, res, next) => {
  // If running on Render, use the Render host link; otherwise fallback to localhost
  swaggerDocument.host = req.get('host'); 
  req.swaggerDoc = swaggerDocument;
  next();
});

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(null, { swaggerOptions: { url: '/api-docs/swagger.json' } }));

module.exports = router;
