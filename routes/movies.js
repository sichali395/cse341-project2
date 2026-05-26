const router = require('express').Router();
const moviesController = require('../controllers/movies');
const { movieValidationRules, validate } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate'); // Secure import

router.get('/', moviesController.getAll);
router.get('/:id', moviesController.getSingle);

// Protected mutation endpoints
router.post('/', isAuthenticated, movieValidationRules(), validate, moviesController.createMovie);
router.put('/:id', isAuthenticated, movieValidationRules(), validate, moviesController.updateMovie);
router.delete('/:id', isAuthenticated, moviesController.deleteMovie);

module.exports = router;
