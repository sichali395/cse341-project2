const router = require('express').Router();
const moviesController = require('../controllers/movies');
const { movieValidationRules, validate } = require('../middleware/validate');

router.get('/', moviesController.getAll);
router.get('/:id', moviesController.getSingle);
router.post('/', movieValidationRules(), validate, moviesController.createMovie);
router.put('/:id', movieValidationRules(), validate, moviesController.updateMovie);
router.delete('/:id', moviesController.deleteMovie);

module.exports = router;
