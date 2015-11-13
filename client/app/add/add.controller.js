// User wants to add a book to the collection

'use strict';
angular.module('booktradeBootstrapApp')
  .controller('AddCtrl', function ($scope, $http, $mdDialog, Auth) {

    $scope.userInputBook = 'helvete';

    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.books = [];

    $scope.bookIds = [];

    $scope.isLoading = false;

    // User searched for a search term
    $scope.bookLookup = function () {
      $scope.books = [];
      console.log('Doing a book lookup for ', $scope.userInputBook);

      // Populate books array with books from google books api that have a thumbnail and authors
      $http.get('/api/books/' + $scope.userInputBook).success(function (booksFromGoogleApi) {

        $scope.isLoading = true;

        booksFromGoogleApi.forEach(function (book) {
          if (book.hasOwnProperty('thumbnail') && book.hasOwnProperty('authors')) {
            $scope.books.push(book);
          }
        });

        $scope.isLoading = false;

        console.log($scope.books);
      }).error(function (error) {
        console.log(error);
      });
    }

    $scope.addBook = function (book) {
      console.log('hello from add book');

      // First, check for dupes
      $http.get('/api/books').success(function (dbBooks) {

        $scope.isLoading = true;

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

        $scope.isLoading = false;

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
            author: book.authors[0],
            owner: $scope.getCurrentUser().name
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
