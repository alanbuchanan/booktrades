'use strict';

angular.module('booktradeBootstrapApp')
  .controller('MyBooksCtrl', function ($scope, $http, Auth) {

    $scope.getCurrentUser = Auth.getCurrentUser().name;
    $scope.books = [];

    $http.get('/api/books').success(function (books) {
      books.forEach(function (book) {
        if (book.owner === $scope.getCurrentUser) {
          $scope.books.push(book)
        }
      });
      console.log('Books: ', books);
    }).error(function (error) {
      console.log('There was a problem: ', error);
    })

    $scope.removeMyBook = function (book) {
      $http.delete('/api/books/' + book.id).success(function () {

      }).error(function (error) {
        console.log(error);
      })
    }

  });
