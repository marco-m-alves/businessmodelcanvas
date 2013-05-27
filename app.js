var app = angular.module('plunker', ['businessmodelcanvas', 'editors']);

app.controller('MainCtrl', function($scope) {
  $scope.bmc = { 
    'value-proposition': [{text: 'Accurate as autopsy'}, {text: 'Easy as BioImp'}, {text:'Cheap as BioImp'}]
    };
    
  $scope.test = ['Accurate as autopsy', 'Easy as BioImp', 'Cheap as BioImp'];  
});