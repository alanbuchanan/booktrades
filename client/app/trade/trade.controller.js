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
    });

    // User clicked accept on a trade
    $scope.acceptTrade = function (trade) {

      // Perform owner swap in `books`
      $scope.wantedUserTemp = trade.wanted.user;
      $scope.offeredUserTemp = trade.offered.user;

      $http.put('/api/books', {bookId: trade.offered.bookId, user: $scope.wantedUserTemp})
        .success(function () {

      }).error(function (error) {
        console.log('problem PUTing:', error);
      });

      $http.put('/api/books/', {bookId: trade.wanted.bookId, user: $scope.offeredUserTemp})
        .success(function () {

      }).error(function (error) {
        console.log('problem PUTing:', error);
      });

      // Send delete request

      // Get `trades` list again

      // Toast to confirm
    };

    // User clicked reject on a trade
    $scope.rejectTrade = function (trade) {
      // Send delete request

      // Get `trades` list again

      // Toast to confirm
    };

    //$http.get('api/books').success(function (data) {
    //
    //}).error(function (error) {
    //  console.log('problem:', error);
    //})

  });

//TODO: think of a way to layout numerous trade requests
//TODO: filter $scope.trades so that it's relative to the user
//TODO: perform get request to get book info from /api/books using id
//TODO: implement accept or reject functionality
//TODO: prevent any book in a current trade from being possible to trade: 'this book cannot be traded because it is part of an active trade'
//TODO: amend `books` model and post reqs to remove `tradeRequests` property
//TODO: improve get request in this file: don't get all trades and then foreach, search db by username instead
