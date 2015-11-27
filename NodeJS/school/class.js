var _teacher = require('./teacher');
var _student = require('./student');

function add(teacher, students) {
	_teacher.add(teacher);
	students.forEach(function(item, index){
		_student.add(item)
	});
}

exports.add = add;