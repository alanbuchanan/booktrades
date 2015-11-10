'use strict';

describe('Controller: MyBooksCtrl', function () {

  // load the controller's module
  beforeEach(module('booktradeBootstrapApp'));

  var MyBooksCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyBooksCtrl = $controller('MyBooksCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
