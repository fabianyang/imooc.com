var helloModule=angular.module('HelloAngular', []);
helloModule.controller('helloNgCtrl', ['$scope', function($scope){
	$scope.greeting = {
        text: 'Hello'
    };
}]);
