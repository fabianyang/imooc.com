var myModule = angular.module("MyModule", []);
myModule.directive("hello", function() {
    return {
        restrict: 'AECM',
        templateUrl: 'hello.html',
        replace: true
    }
});