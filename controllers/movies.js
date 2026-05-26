const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection('movies').find();
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
    const result = await mongodb.getDb().db().collection('movies').find({ _id: id });
    result.toArray().then((lists) => {
      if (lists.length === 0) return res.status(404).json({ message: 'Movie not found.' });
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const movie = {
      title: req.body.title,
      director: req.body.director,
      releaseYear: parseInt(req.body.releaseYear),
      genre: req.body.genre,
      rating: parseFloat(req.body.rating),
      duration: parseInt(req.body.duration),
      language: req.body.language,
      isAvailable: req.body.isAvailable
    };
    const response = await mongodb.getDb().db().collection('movies').insertOne(movie);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json({ message: 'An error occurred while expanding the database.' });
    }
  } catch (err) {
    next(err);
  }
};

const updateMovie = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format.' });
    }
    const id = new ObjectId(req.params.id);
    const movie = {
      title: req.body.title,
      director: req.body.director,
      releaseYear: parseInt(req.body.releaseYear),
      genre: req.body.genre,
      rating: parseFloat(req.body.rating),
      duration: parseInt(req.body.duration),
      language: req.body.language,
      isAvailable: req.body.isAvailable
    };
    const response = await mongodb.getDb().db().collection('movies').replaceOne({ _id: id }, movie);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Movie not found or parameters matching original values.' });
    }
  } catch (err) {
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format.' });
    }
    const id = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('movies').deleteOne({ _id: id });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(404).json({ message: 'Target entry was not located.' });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getSingle, createMovie, updateMovie, deleteMovie };
