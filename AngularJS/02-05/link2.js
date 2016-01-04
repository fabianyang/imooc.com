var myModule = angular.module("MyModule", []);
myModule.directive("hello", function() {
    return {
        restrict: "AE",
        // compile: function(tElement, tAttrs, transclude) {
        //     return {
        //         pre: function preLink(scope, iElement, iAttrs, controller) {
        //             console.log("pre compile...");
        //         },
        //         post: function postLink(scope, iElement, iAttrs, controller) {
        //             console.log("post compile...");
        //         }
        //     }
        // },
        link: function(scope, element, attrs) {
            console.log("link...");
            element.bind("mouseenter", function(event) {
                console.log("鼠标进入...");
            });
            element.bind("mouseout", function(event) {
                console.log("鼠标滑出...");
            });
        }
    }
});
