var myModule = angular.module("MyModule", []);
myModule.directive("hello", function() {
    return {
    	restrict:"AE",
    	link:function(scope,element,attrs){
	    	console.log(element);
	    	element.bind("mouseenter",function(){
	    		console.log("鼠标进入...");
	    	});
	    	element.bind("mouseout",function(){
	    		console.log("鼠标滑出...");
	    	});
	    }
    } 
});