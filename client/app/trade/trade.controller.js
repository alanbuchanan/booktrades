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
          if (trade.wanted.owner === $scope.getCurrentUser().name) {
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
      $scope.wantedUserTemp = trade.wanted.owner;
      $scope.offeredUserTemp = trade.offered.owner;

      $http.put('/api/books', {id: trade.offered.id, owner: $scope.wantedUserTemp})
        .success(function () {

        }).error(function (error) {
          console.log('problem PUTing:', error);
        });

      $http.put('/api/books/', {id: trade.wanted.id, owner: $scope.offeredUserTemp})
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

    // Check if book belongs to user
    $scope.isUsers = function (book) {
      return $scope.getCurrentUser().name === book.owner;
    }

  });

//TODO: improve get request in this file: don't get all trades and then foreach, search db by username instead
