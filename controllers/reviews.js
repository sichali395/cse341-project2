const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection('reviews').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    next(err);
  }
};

const getSingle = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format.' });
    }
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('reviews').find({ _id: id });
    result.toArray().then((lists) => {
      if (lists.length === 0) return res.status(404).json({ message: 'Review not found.' });
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    next(err);
  }
};

const createReview = async (req, res, next) => {
  try {
    const review = {
      movieId: req.body.movieId,
      reviewerName: req.body.reviewerName,
      comment: req.body.comment,
      rating: parseInt(req.body.rating)
    };
    const response = await mongodb.getDb().db().collection('reviews').insertOne(review);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: 'An error occurred while saving the review.' });
    }
  } catch (err) {
    next(err);
  }
};

const updateReview = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format.' });
    }
    const id = new ObjectId(req.params.id);
    const review = {
      movieId: req.body.movieId,
      reviewerName: req.body.reviewerName,
      comment: req.body.comment,
      rating: parseInt(req.body.rating)
    };
    const response = await mongodb.getDb().db().collection('reviews').replaceOne({ _id: id }, review);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Review not found or no changes made.' });
    }
  } catch (err) {
    next(err);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format.' });
    }
    const id = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('reviews').deleteOne({ _id: id });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json({ message: 'Target review was not located.' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getSingle, createReview, updateReview, deleteReview };
