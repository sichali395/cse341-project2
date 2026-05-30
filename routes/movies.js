const router = require('express').Router();
const moviesController = require('../controllers/movies');
const { movieValidationRules, validate } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

// Explicit mapping for your Movies CRUD endpoints
router.get('/', moviesController.getAll);
router.get('/:id', moviesController.getSingle);
router.post('/', isAuthenticated, movieValidationRules(), validate, moviesController.createMovie);
router.put('/:id', isAuthenticated, movieValidationRules(), validate, moviesController.updateMovie);
router.delete('/:id', isAuthenticated, moviesController.deleteMovie);

module.exports = router;
