const router = require('express').Router();

router.use('/movies', require('./movies'));
router.use('/reviews', require('./reviews'));
router.use('/api-docs', require('./swagger'));

// Fallback response for the absolute root path
router.get('/', (req, res) => {
  res.send('Welcome to the Movies and Reviews Media API! Access /api-docs for documentation.');
});

module.exports = router;
