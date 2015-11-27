//<script src='a.js'></script>
//<script src='b.js'></script>
//<script src='c.js'></script>

// b.js，while的条件永远为真，就会一直不断运行下去，阻塞在这里，这种为同步
/*
var i = 0;
while (true) {
	i++;
}
*/

//js异步例子，setTimeout()和setInterval()

var c = 0;

function printIt() {
	console.log(c);
}

function plus(callback) {
	setTimeout(function() {
		c += 1;
		callback(c);
	}, 1000);
}

plus(printIt);