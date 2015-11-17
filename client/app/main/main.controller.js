'use strict';
angular.module('booktradeBootstrapApp')
// User wants to trade a book
  .controller('MainCtrl', function ($scope, $http, Auth, $mdDialog) {

    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.books = [];
    $scope.usersBooks = [];

    $scope.isLoading = false;

    // Get list of all books from db
    $http.get('/api/books').success(function (books) {
      $scope.isLoading = true;
      $scope.books = books;

      // Get users books
      $scope.books.forEach(function (book) {
        if (book.owner === $scope.getCurrentUser().name) {
          $scope.usersBooks.push(book);
        }
      });

      $scope.isLoading = false;

      console.log('Books: ', books);
    }).error(function (error) {
      console.log('There was a problem: ', error);
    });

    $scope.currentTradeBook = {};

    // User pressed trade button
    $scope.trade = function (userClickedBook) {

      $scope.currentTradeBook = userClickedBook;

      $scope.idsList = [];

      // Check if trade already exists for selected book
      $http.get('/api/trades').success(function (trades) {

        $scope.isLoading = true;

        // Compare trade IDs to book IDs
        trades.forEach(function (trade) {
          console.log('TRADE: ', trade);
          $scope.idsList.push(trade.offered.id);
          $scope.idsList.push(trade.wanted.id);
        });

        console.log('idslist:', $scope.idsList);

        console.log('idsList index of ' + userClickedBook.id + ' is ' + $scope.idsList.indexOf(userClickedBook.id));

        if ($scope.idsList.indexOf(userClickedBook.id) !== -1) {
          // Already being traded

          $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(true)
              .title('Book already being traded')
              .content('Sorry, this book is already being traded by other users!')
              .ok('Got it!')
          );

        } else {
          // Not being traded

          $mdDialog.show({
            controller: 'TradeDialogCtrl',
            templateUrl: 'app/trade-dialog/trade-dialog.html',
            clickOutsideToClose: true,
            // Pass in vals from MainCtrl
            locals: {
              userClickedBook: userClickedBook,
              usersBooks: $scope.usersBooks
            }
          }).then(function () {
            //Success
          }, function () {
            //Error
          });
        }

        $scope.isLoading = false;

      }).error(function (error) {
        console.log(error);
      });

    };

    // Check if book belongs to user
    $scope.isUsers = function (book) {
      return $scope.getCurrentUser().name === book.owner;
    };
  });

// TODO: why is scss showing errors in the 'messages' pane every time you create a route
// TODO: toasts and spinners need to be serviced or factoried really
// TODO: fix user settings reset
