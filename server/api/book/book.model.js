'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
  id: String,
  title: String,
  author: String,
  thumbnail: String,
  owner: String,
  tradeRequests: [String]
});

module.exports = mongoose.model('Book', BookSchema);
