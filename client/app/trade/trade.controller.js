'use strict';

angular.module('booktradeBootstrapApp')
  .controller('TradeCtrl', function ($scope, $http) {

    $scope.trades = [];

    $http.get('/api/trades').success(function (trades) {
      $scope.trades = trades;
      console.log($scope.trades);
    }).error(function (error) {
      console.log('There was an error:', error);
    })
  });

//TODO: think of a way to layout numerous trade requests
//TODO: filter $scope.trades so that it's relative to the user
//TODO: perform get request to get book info from /api/books using id
//TODO: implement accept or reject functionality
