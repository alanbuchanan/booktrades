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

    // User wants to trade a book
    $scope.trade = function (userClickedBook) {
      console.log('hi from trade');
      $mdDialog.show({
        controller: TradeDialogCtrl,
        template:
        '<md-dialog aria-label="Trade" ng-cloak>' +
          '<form>' +
            '<md-toolbar>' +
              '<div class="md-toolbar-tools">' +
                '<h2>Trade books with someone else</h2>' +
                '<span flex></span>' +
                '<md-button class="md-icon-button" ng-click="cancel()">' +
                  '<md-icon md-svg-src="img/icons/ic_close_24px.svg" aria-label="Close dialog"></md-icon>' +
                '</md-button>' +
              '</div>' +
            '</md-toolbar>' +
            '<md-dialog-content style="max-width:800px;max-height:810px; ">' +
              '<div class="md-dialog-content">' +
                '<p>Stuff</p>' +
              '</div>' +
            '</md-dialog-content>' +
          '</form>' +
        '</md-dialog>',
        parent: angular.element(document.body),
        targetEvent: userClickedBook,
        clickOutsideToClose: true
      })
        .then(function (answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function () {
          $scope.status = 'You cancelled the dialog.';
        });
    };

    // Deletes a book from my-books
    $scope.removeMyBook = function (book) {

      var confirm = $mdDialog.confirm()
        .title('Are you sure you want to remove \'' + book.title + '\'?')
        .content('')
        .ok('Ok')
        .cancel('Cancel');
      $mdDialog.show(confirm).then(function () {
        httpDelete();
      }, function () {
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

function TradeDialogCtrl($scope, $mdDialog) {

  $scope.aogpiowirecgmoeisrgmcoes = 'Yes';

  $scope.hide = function () {
    $mdDialog.hide();
  };
  $scope.cancel = function () {
    $mdDialog.cancel();
  };
  $scope.answer = function (answer) {
    $mdDialog.hide(answer);
  };
}
