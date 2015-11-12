'use strict';

angular.module('booktradeBootstrapApp')
  .controller('TradeCtrl', function ($scope, $http, Auth) {

    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.trades = [];

    $http.get('/api/trades').success(function (trades) {

      // Trades should be composed of wanted username of trades from db
      trades.forEach(function (trade) {
        if (trade.wanted.user === $scope.getCurrentUser().name) {
          $scope.trades.push(trade);
        }
      })
      console.log($scope.trades);
    }).error(function (error) {
      console.log('There was an error:', error);
    })
  });

//TODO: think of a way to layout numerous trade requests
//TODO: filter $scope.trades so that it's relative to the user
//TODO: perform get request to get book info from /api/books using id
//TODO: implement accept or reject functionality
//TODO: prevent any book in a current trade from being possible to trade: 'this book cannot be traded because it is part of an active trade'
//TODO: amend `books` model and post reqs to remove `tradeRequests` property
