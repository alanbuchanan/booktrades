'use strict';

angular.module('booktradeBootstrapApp')
  .controller('AddCtrl', function ($scope, $http) {
    $scope.userInputBook = '';

    $scope.books = [];

    $scope.bookLookup = function () {
      console.log('Doing a book lookup for ', $scope.userInputBook);

      $http.get('/api/books/' + $scope.userInputBook).success(function (data) {
        console.log(data);
        $scope.books = data;
      }).error(function (error) {
        console.log(error);
      });
    }

  });
