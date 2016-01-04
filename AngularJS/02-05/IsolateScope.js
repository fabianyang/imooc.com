var myModule = angular.module("MyModule", []);
myModule.directive("hello", function() {
    return {
        restrict: 'AE',
        scope:{},
        template: '<div><input type="text" ng-model="userName"/>{{userName}}</div>',
        replace: true
    }
});