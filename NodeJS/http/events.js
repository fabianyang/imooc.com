var EventEmitter = require('events').EventEmitter
var life = new EventEmitter()

life.setMaxListeners(11)

function gun(who){
	console.log('给' + who + '滚你妹的')
}

//addEventListener
life.on('qiuanwei', function(who){
	console.log('给' + who + '倒水')
})

life.on('qiuanwei', gun)//这里gun不要给它带参数，这我老是记不住
//对一个事件不要增加太多的事件监听
life.on('qiuanwei', function(who){
	console.log('给' + who + '揉肩')
})
life.on('qiuanwei', function(who){
	console.log('给' + who + '做饭')
})
life.on('qiuniai', function(who){
	console.log('给' + who + '洗衣服')
})

life.on('qiuniai', gun)
life.emit('qiuanwei', '汉子')

//批量移除
life.removeAllListeners('qiuanwei')	//需要传递具体的值，不然会移除所有的额值
life.removeListener('qiuniai', gun)	//这里通过匿名还是是不能移除的
var hasConfortListener =  life.emit('qiuanwei', '汉子')

console.log(life.listeners('qiuanwei').length)
console.log(life.listeners('qiuniai').length)
//如果不穿具体的值，得到的值就是0

//快速获得某个事件监听的数量
// console.log(EventEmitter.listenerCount(life,'HeHe'))//life表示的是实例


//事件触发了才去监听...
//life.emit('HeHe', '汉子')它的返回值是true or false
// var hasLovedListener =  life.emit('我去', '妹纸')
// var hasPlayedListener =  life.emit('日了狗了', '妹纸和汉子')

// console.log(hasConfortListener)
// console.log(hasLovedListener)
// console.log(hasPlayedListener)
