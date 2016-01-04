var expanderModule=angular.module('expanderModule', []);
expanderModule.directive('expander', function() {
	return {
		restrict : 'EA',
		replace : true,
		transclude : true,
		scope : {
			title : '=expanderTitle'
		},
		template : '<div>'
				 + '<div class="title" ng-click="toggle()">{{title}}</div>'
				 + '<div class="body" ng-show="showMe" ng-transclude></div>'
				 + '</div>',
		link : function(scope, element, attrs) {
			scope.showMe = false;
			scope.toggle = function() {
				scope.showMe = !scope.showMe;
			}
		}
	}
});
expanderModule.controller('SomeController',function($scope) {
    $scope.title = '点击展开';
	$scope.text = '这里是内部的内容。';
});
