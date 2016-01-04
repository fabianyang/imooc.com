var myModule=angular.module("MyModule",[]);
myModule.filter('filter1',function(){
    return function(item){
        return item + 'o(∩_∩)o';
    }
});  