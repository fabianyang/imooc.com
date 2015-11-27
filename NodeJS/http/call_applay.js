var pet = {
	words: '...',
	speak: function(say) {
		console.log(say + ' ' + this.words);
	}
}
// pet.speak('Speak')

var dog = {
	words: 'Wang'
}

//call 可以改变上下文
pet.speak.call(dog, 'Speck')