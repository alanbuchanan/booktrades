'use strict';

var _ = require('lodash');
var Book = require('./book.model');
var books = require('google-books-search-2');

var options = {
  key: "AIzaSyC6-UJyS_OJqLYqwvwSHLsN3UTEI_DmUaI",
  offset: 0,
  limit: 10,
  type: 'books',
  order: 'relevance',
  lang: 'en'
};


// Gets list of books from db
exports.lookup = function (req, res) {
  console.log('hello from lookup');
  Book.find({}, function (err, books) {
    if (err) return res.status(500).send(err);
    res.status(200).json(books);
  })
};

// Gets list of books from google api
exports.index = function(req, res) {
  console.log('user searched for:', req.params.book);
  //books.search(req.params.book, function(error, results) {
  //  if (!error) {
  //    console.log(results[0]);
  //    res.status(201).json(results);
  //  } else {
  //    console.log(error);
  //    return res.status(404);
  //  }
  //});
  books.search(req.params.book, options)
    .then(function(results) {
      console.log(results[0]);
      res.status(201).json(results);
    })
    .catch(function(error) {
      console.log(error);
      return res.status(404);
    });
};

// Gets a single book
exports.show = function(req, res) {
  Book.findById(req.params.id, function (err, book) {
    if(err) { return handleError(res, err); }
    if(!book) { return res.status(404).send('Not Found'); }
    return res.json(book);
  });
};

// Creates a new book in the DB.
exports.create = function(req, res) {
  console.log('user chose to add:', req.body);
  Book.create(req.body, function(err, book) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(book);
  });
};

// Updates an existing book in the DB.
exports.update = function(req, res) {
  //if(req.body._id) { delete req.body._id; }
  console.log('req', req.body);

  Book.findOne({id: req.body.id}, function (err, book) {
    console.log('ORIGINAL BOOK', book);
    book.owner = req.body.owner;

    if (err) { return handleError(res, err); }
    if(!book) { return res.status(404).send('Not Found'); }

    var updated = _.merge(book, {owner: req.body.owner});
    console.log('UPDATED BOOK:', updated);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(book);
    });

  });
};

// Deletes a book from the DB.
exports.destroy = function(req, res) {
  console.log('params: ', req.params);
  Book.findOne({id: req.params.id}, function (err, book) {
    if(err) { return handleError(res, err); }
    if(!book) { return res.status(404).send('Not Found'); }
    book.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
