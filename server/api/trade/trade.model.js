'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TradeSchema = new Schema({
  wanted: {
    id: String,
    title: String,
    author: String,
    thumbnail: String,
    owner: String
  },
  offered: {
    id: String,
    title: String,
    author: String,
    thumbnail: String,
    owner: String
  }
});

module.exports = mongoose.model('Trade', TradeSchema);
