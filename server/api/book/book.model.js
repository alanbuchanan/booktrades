'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
  id: String,
  title: String,
  author: String,
  thumbnail: String,
  owner: String,
  tradeRequest: {
    targetUser: String,
    targetBook: {
      id: String,
      title: String,
      thumbnail: String
    }
  }
});

module.exports = mongoose.model('Book', BookSchema);
