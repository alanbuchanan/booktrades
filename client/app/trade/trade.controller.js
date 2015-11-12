'use strict';

angular.module('booktradeBootstrapApp')
  .controller('TradeCtrl', function ($scope, $http, Auth) {

    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.trades = [];

    var getTrades = function () {

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
    };

    getTrades();

    var remove = function (trade) {
      $http.delete('/api/trades/' + trade._id).success(function () {
        console.log('delete pressed');
      }).error(function (error) {
        console.log('error', error);
      })
    };

    // User clicked accept on a trade
    $scope.acceptTrade = function (trade) {

      // Perform owner swap in `books`
      $scope.wantedUserTemp = trade.wanted.user;
      $scope.offeredUserTemp = trade.offered.user;

      var swapBook = {
        bookId: trade.offered.bookId,
        user: $scope.wantedUserTemp
      }

      $http.put('/api/books', {bookId: trade.offered.id, owner: $scope.wantedUserTemp})
        .success(function () {

        }).error(function (error) {
          console.log('problem PUTing:', error);
        });

      $http.put('/api/books/', {bookId: trade.wanted.id, owner: $scope.offeredUserTemp})
        .success(function () {

        }).error(function (error) {
          console.log('problem PUTing:', error);
        });

      // Send delete request
      remove(trade);
      // Get `trades` list again
      getTrades();

      // Toast to confirm
    };

    // User clicked reject on a trade
    $scope.rejectTrade = function (trade) {

      // Send delete request
      remove(trade);

      // Get `trades` list again
      getTrades();

      // Toast to confirm
    };

    //$http.get('api/books').success(function (data) {
    //
    //}).error(function (error) {
    //  console.log('problem:', error);
    //})

  });

//TODO: amend `books` model and post reqs to remove `tradeRequests` property
//TODO: perform get request to get book info from /api/books using id
//TODO: prevent any book in a current trade from being possible to trade: 'this book cannot be traded because it is part of an active trade'
//TODO: improve get request in this file: don't get all trades and then foreach, search db by username instead
