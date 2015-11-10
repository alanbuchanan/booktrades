'use strict';

angular.module('booktradeBootstrapApp')
  .controller('MainCtrl', function ($scope, $http) {
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

// TODO: implement pages: add, trade
// TODO: experiment with adding a book to books collection bearing in mind notes made
// TODO: prevent user interacting with app if they are not logged in. always redirect to login
// TODO: can trades view be done in an alert with dropdowns?
