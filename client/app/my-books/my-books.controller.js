'use strict';

angular.module('booktradeBootstrapApp')
  .controller('MyBooksCtrl', function ($scope, $http, Auth, $mdDialog) {

    $scope.getCurrentUser = Auth.getCurrentUser().name;
    $scope.books = [];

    // Get list of books from db
    var getBooks = function () {
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
    };

    getBooks();

    // Deletes a book from my-books
    $scope.removeMyBook = function (book) {

      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to remove \'' + book.title + '\'?')
        .content('')
        .ok('Ok')
        .cancel('Cancel');
      $mdDialog.show(confirm).then(function() {
        httpDelete();
      }, function() {
        // error
      });


    var httpDelete = function () {
        $http.delete('/api/books/' + book.id).success(function () {
          // Get books from db (again) to prevent dupes on front end: inefficient?
          getBooks();
        }).error(function (error) {
          console.log(error);
        })
      };
    }

  });
