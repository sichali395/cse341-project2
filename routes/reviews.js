const router = require('express').Router();
const reviewsController = require('../controllers/reviews');
const { reviewValidationRules, validate } = require('../middleware/validate');

router.get('/', reviewsController.getAll);
router.get('/:id', reviewsController.getSingle);
router.post('/', reviewValidationRules(), validate, reviewsController.createReview);
router.put('/:id', reviewValidationRules(), validate, reviewsController.updateReview);
router.delete('/:id', reviewsController.deleteReview);

module.exports = router;
