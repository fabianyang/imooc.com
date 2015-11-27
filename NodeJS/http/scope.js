var globalVar = 'This is a global variable'

function globalFunction() {
	var localVar = 'This is a local variable'

	console.log('Visit global/local variable')
	console.log(globalVar)
	console.log(localVar)

	globalVar = 'This is changed variable'

	function localFunction() {
		var innerLocalVar = 'This is a inner local variable'

		console.log('Visit global/local/innerLocal variable')
		console.log(globalVar)
		console.log(localVar)
		console.log(innerLocalVar)
	}

	localFunction()
}

globalFunction()