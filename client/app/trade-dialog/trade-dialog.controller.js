'use strict';

angular.module('booktradeBootstrapApp')
  .controller('TradeDialogCtrl', function ($scope, $http, userClickedBook, usersBooks, $mdDialog, Auth) {

    // Passed in from the MainCtrl, which called the dialog
    $scope.usersBooks = usersBooks;
    $scope.userClickedBook = userClickedBook;

    $scope.getCurrentUser = Auth.getCurrentUser;

    console.log('userbook:', $scope.userClickedBook);
    console.log('usersBooks: ', $scope.usersBooks);

    $scope.selected = {};

    $scope.tradeItem = {
      wanted: {
        user: $scope.userClickedBook.owner,
        bookId: $scope.userClickedBook.id
      },
      offered: {
        user: '',
        bookId: ''
      }

    };

    // User pressed 'save' on the trade dialog
    $scope.save = function () {

      console.log('selected:', JSON.parse($scope.selected));
      $scope.selected = JSON.parse($scope.selected);
      console.log('typeof', typeof($scope.selected));

      $scope.tradeItem.offered = {
        user: $scope.selected.owner,
        bookId: $scope.selected.id
      }

      //$http.post('api/trades', tradeItem).success(function () {
      console.log('tradeItem: ', $scope.tradeItem);
      //}).error(function (error) {
      //  console.log('There was a problem: ', error);
      //})
      $scope.cancelDialog();
    };

    // User pressed 'cancel' on trade dialog
    $scope.cancelDialog = function () {
      $mdDialog.hide();
    }
  });
