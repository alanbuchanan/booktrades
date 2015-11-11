'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TradeSchema = new Schema({
  wanted: {
    user: String,
    bookId: String
  },
  offered: {
    user: String,
    bookId: String
  }
});

module.exports = mongoose.model('Trade', TradeSchema);
