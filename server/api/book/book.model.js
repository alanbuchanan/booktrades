'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
  id: String,
  name: String,
  author: String,
  owner: String,
  tradeRequests: [String]
});

module.exports = mongoose.model('Book', BookSchema);
