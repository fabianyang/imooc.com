var _class = require('./class');

_class.add('YangFan', ['bfm','gfs']);

/* 把class暴露出去
exports.add = function(classes) {
	classes.forEach(function(item, index){
		var teacher = item.teacher;
		var students = item.students;

		_class.add(teacher, students);
	})
}
*/