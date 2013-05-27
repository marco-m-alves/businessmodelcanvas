describe('Testing a Hello World controller', function() {
  var $scope = null;
  var ctrl = null;

  //you need to indicate your module in a test
  beforeEach(module('plunker'));

  beforeEach(inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();

    ctrl = $controller('MainCtrl', {
      $scope: $scope
    });
  }));

  it('should say hallo to the World', function() {
    // expect($scope.name).toEqual('World');
  });
});