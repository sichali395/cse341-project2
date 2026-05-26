const { body, validationResult } = require('express-validator');

// Validation rules for adding or updating a Movie (9 fields checked)
const movieValidationRules = () => {
  return [
    body('title').notEmpty().withMessage('Title is required.'),
    body('director').notEmpty().withMessage('Director is required.'),
    body('releaseYear').isInt({ min: 1888, max: new Date().getFullYear() + 5 }).withMessage('Provide a valid release year.'),
    body('genre').notEmpty().withMessage('Genre is required.'),
    body('rating').isFloat({ min: 0, max: 10 }).withMessage('Rating must be a decimal/number between 0 and 10.'),
    body('duration').isInt({ min: 1 }).withMessage('Duration must be a positive integer representing minutes.'),
    body('language').notEmpty().withMessage('Language is required.'),
    body('isAvailable').isBoolean().withMessage('isAvailable field must be a true/false boolean value.')
  ];
};

// Validation rules for adding or updating a Review (4 fields checked)
const reviewValidationRules = () => {
  return [
    body('movieId').notEmpty().withMessage('Associated Movie ID reference is required.'),
    body('reviewerName').notEmpty().withMessage('Reviewer Name is required.'),
    body('comment').notEmpty().withMessage('Review comment text is required.'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Review rating score must be an integer between 1 and 5.')
  ];
};

// Error evaluation wrapper
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

module.exports = {
  movieValidationRules,
  reviewValidationRules,
  validate
};
