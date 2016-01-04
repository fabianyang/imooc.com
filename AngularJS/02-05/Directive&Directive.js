var myModule = angular.module("MyModule", []);
myModule.directive("superman", function() {
    return {
        scope: {},
        restrict: 'AE',
        controller: function($scope) {
            $scope.abilities = [];
            this.addStrength = function() {
                $scope.abilities.push("strength");
            };
            this.addSpeed = function() {
                $scope.abilities.push("speed");
            };
            this.addLight = function() {
                $scope.abilities.push("light");
            };
        },
        link: function(scope, element, attrs) {
            element.addClass('btn btn-primary');
            element.bind("mouseenter", function() {
                console.log(scope.abilities);
            });
        }
    }
});
myModule.directive("strength", function() {
    return {
        require: '^superman',
        link: function(scope, element, attrs, supermanCtrl) {
            supermanCtrl.addStrength();
        }
    }
});
myModule.directive("speed", function() {
    return {
        require: '^superman',
        link: function(scope, element, attrs, supermanCtrl) {
            supermanCtrl.addSpeed();
        }
    }
});
myModule.directive("light", function() {
    return {
        require: '^superman',
        link: function(scope, element, attrs, supermanCtrl) {
            supermanCtrl.addLight();
        }
    }
});