'use strict';

angular.module('booktradeBootstrapApp')
  .controller('TradeDialogCtrl', function ($scope, $http, userClickedBook, usersBooks, $mdDialog, Auth) {

    // Passed in from the MainCtrl, which called the dialog
    $scope.usersBooks = usersBooks;
    $scope.booksToList = [];
    $scope.idsList = [];

    $http.get('/api/trades').success(function (trades) {


      // Compare trade IDs to book IDs
      trades.forEach(function (trade) {
        console.log('TRADE: ', trade);
        $scope.idsList.push(trade.offered.id);
        $scope.idsList.push(trade.wanted.id);
      });

      $scope.usersBooks.forEach(function (book) {
        if ($scope.idsList.indexOf(book.id) === -1) {
          $scope.booksToList.push(book);
        }
      });

      $scope.userClickedBook = userClickedBook;

      $scope.getCurrentUser = Auth.getCurrentUser;

      console.log('chosen book:', $scope.userClickedBook);
      console.log('usersBooks: ', $scope.booksToList);

      $scope.selected = {};

      // Init trade item
      $scope.tradeItem = {};
      $scope.tradeItem.wanted = $scope.userClickedBook;

      // User pressed 'save' on the trade dialog
      $scope.save = function () {

        $scope.selected = JSON.parse($scope.selected);

        // Append user's choice in this function to avoid potential async issues
        $scope.tradeItem.offered = $scope.selected;

        $http.post('api/trades', $scope.tradeItem).success(function () {
          console.log('tradeItem: ', $scope.tradeItem);
        }).error(function (error) {
          console.log('There was a problem: ', error);
        })
        $scope.cancelDialog();
      };

      // User pressed 'cancel' on trade dialog
      $scope.cancelDialog = function () {
        $mdDialog.hide();
      }
    });
  });
