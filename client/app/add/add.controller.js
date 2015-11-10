// User wants to add a book to the collection

'use strict';
angular.module('booktradeBootstrapApp')
  .controller('AddCtrl', function ($scope, $http, $mdDialog, Auth) {

    $scope.userInputBook = 'helvete';

    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.books = [];

    $scope.bookIds = [];

    // User searched for a search term
    //$scope.bookLookup = function () {
    console.log('Doing a book lookup for ', $scope.userInputBook);

    $http.get('/api/books/' + $scope.userInputBook).success(function (booksFromGoogleApi) {
      booksFromGoogleApi.forEach(function (book) {
        if (book.hasOwnProperty('thumbnail')) {
          $scope.books.push(book);
        }
      });

      console.log($scope.books);
    }).error(function (error) {
      console.log(error);
    });
    //}

    $scope.addBook = function (book) {
      console.log('hello from add book');

      // First, check for dupes
      $http.get('/api/books').success(function (dbBooks) {

        dbBooks.forEach(function (dbBook) {
          $scope.bookIds.push(dbBook.id);
        });

        console.log('IDs: ', $scope.bookIds);

        if ($scope.bookIds.indexOf(book.id) !== -1) {
          console.log('DUPE FOUND');
          dupeMessage();
        } else {
          confirmAdd();
        }
      });

      var dupeMessage = function (ev) {
        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Book already in collection')
            .content('Someone else already owns this book!')
            .ok('Got it!')
            .targetEvent(ev)
        );
      };

      var confirmAdd = function () {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
          .title('Would you like to add \'' + book.title + '\' to the collection?')
          .content('This book will be added to the collection and tradeable with other users.')
          .targetEvent(book)
          .ok('OK')
          .cancel('Cancel');
        $mdDialog.show(confirm).then(function () {
          var bookDetails = {
            id: book.id,
            title: book.title,
            thumbnail: book.thumbnail,
            author: book.authors ? book.authors[0] : book.publisher,
            owner: $scope.getCurrentUser().name,
            tradeRequests: []
          };
          $http.post('/api/books', bookDetails).success(function (data) {
            console.log('Posted your book ', book.title);
          })
        }, function () {
          $scope.status = 'Unable to add that book.';
        });
      };
    };

  });