const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/movies', require('./movies'));
router.use('/reviews', require('./reviews'));
router.use('/api-docs', require('./swagger'));

router.get('/', (req, res) => {
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username}` : "Logged out status.");
});

module.exports = router;
