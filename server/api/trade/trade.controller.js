'use strict';

var _ = require('lodash');
var Trade = require('./trade.model');

// Get list of trades
exports.index = function(req, res) {
  Trade.find(function (err, trades) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(trades);
  });
};

// Get a single trade
exports.show = function(req, res) {
  Trade.findById(req.params.id, function (err, trade) {
    if(err) { return handleError(res, err); }
    if(!trade) { return res.status(404).send('Not Found'); }
    return res.json(trade);
  });
};

// Creates a new trade in the DB.
exports.create = function(req, res) {
  Trade.create(req.body, function(err, trade) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(trade);
  });
};

// Updates an existing trade in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Trade.findById(req.params.id, function (err, trade) {
    if (err) { return handleError(res, err); }
    if(!trade) { return res.status(404).send('Not Found'); }
    var updated = _.merge(trade, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(trade);
    });
  });
};

// Deletes a trade from the DB.
exports.destroy = function(req, res) {
  Trade.findById(req.params.id, function (err, trade) {
    if(err) { return handleError(res, err); }
    if(!trade) { return res.status(404).send('Not Found'); }
    trade.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}