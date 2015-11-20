'use strict';

angular.module('booktradeBootstrapApp')
  .controller('TradeCtrl', function ($scope, $http, Auth, $mdToast) {

    // Toast
    var last = {
      bottom: true,
      top: false,
      left: false,
      right: true
    };

    $scope.toastPosition = angular.extend({}, last);
    $scope.getToastPosition = function () {
      sanitizePosition();
      return Object.keys($scope.toastPosition)
        .filter(function (pos) {
          return $scope.toastPosition[pos];
        })
        .join(' ');
    };

    function sanitizePosition() {
      var current = $scope.toastPosition;
      if (current.bottom && last.top) current.top = false;
      if (current.top && last.bottom) current.bottom = false;
      if (current.right && last.left) current.left = false;
      if (current.left && last.right) current.right = false;
      last = angular.extend({}, current);
    }

    $scope.showSimpleToast = function (message) {
      $mdToast.show(
        $mdToast.simple()
          .content(message)
          .position($scope.getToastPosition())
          .hideDelay(3000)
      );
    };

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
        });
      }).error(function (error) {
        console.log('There was an error:', error);
      });
    };

    getTrades();

    var remove = function (trade) {
      $http.delete('/api/trades/' + trade._id).success(function () {

      }).error(function (error) {
        console.log('error', error);
      })
    };

    // User clicked accept on a trade
    $scope.acceptTrade = function (trade) {

      // Perform owner swap in `books`
      $scope.wantedUserTemp = trade.wanted.owner;
      $scope.offeredUserTemp = trade.offered.owner;

      // PUT request for book 1
      $http.put('/api/books', {id: trade.offered.id, owner: $scope.wantedUserTemp})
        .success(function () {

        }).error(function (error) {
          console.log('problem PUTing:', error);
        });

      // PUT request for book 2
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
      $scope.showSimpleToast('You accepted the trade!');
    };

    // User clicked reject on a trade
    $scope.rejectTrade = function (trade) {

      // Send delete request
      remove(trade);

      // Get `trades` list again
      getTrades();

      // Toast to confirm
      $scope.showSimpleToast('You rejected the trade!');
    };

    // Check if book belongs to user
    $scope.isUsers = function (book) {
      return $scope.getCurrentUser().name === book.owner;
    }

  });
