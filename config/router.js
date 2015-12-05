var user = require('./../controllers/user');
var admin = require('./../controllers/admin');
var student = require('./../controllers/student');
var teacher = require('./../controllers/teacher');
var course = require('./../controllers/course');
var section = require('./../controllers/section');
var attendance = require('./../controllers/attendance');
var classlist = require('./../controllers/classlist');
var mailer = require('./../controllers/mailer'); //mailer controller

module.exports = function(router) {

	router.route('/api/users')
		.get(user.find)
		.post(user.insert);
		
    router.route('/api/admins')
        .get(admin.find);
        
    router.route('/api/admins/:id')
        .get(admin.findOne);

	router.route('/api/users/:id')
		.get(user.findOne)
		.put(user.update)
		.delete(user.remove);

	router.route('/api/users/email/:id')
		.get(user.findUserByEmail);

	router.route('/api/students')
		.get(student.find)
		.post(student.insert);

	router.route('/api/students/:id')
		.get(student.findOne)
		.put(student.update)
		.delete(student.remove);

	router.route('/api/teachers')
		.get(teacher.find)
		.post(teacher.insert);

	router.route('/api/teachers/:id')
		.get(teacher.findOne)
		.put(teacher.update)
		.delete(teacher.remove);

	router.route('/api/courses')
		.get(course.find)
		.post(course.insert);

	router.route('/api/courses/:id')
		.get(course.findOne)
		.put(course.update)
		.delete(course.remove);
		
	router.route('/api/courses/number/:id')
	    .get(course.findCourseByCourseNum);

	router.route('/api/sections')
		.get(section.find)
		.post(section.insert);
		
	router.route('/api/sections/code/:courseNum/:sectionCode/:sem/:year')
	    .get(section.findSectionBySectionCode);

	router.route('/api/sections/:id')
		.get(section.findOne)
		.put(section.update)
		.delete(section.remove);

	router.route('/api/sections/courses/:id')
		.get(section.findAllByCourse);

	router.route('/api/sections/students')
		.get(classlist.find)
		.post(classlist.insert);

	router.route('/api/sections/students/:id')
		.get(classlist.findStudentsBySection)
		.put(classlist.update)
		.delete(classlist.remove);

	router.route('/api/attendance')
		.get(attendance.find)
		.post(attendance.insert);

	router.route('/api/attendance/sections/:id')
		.get(attendance.findAttendanceBySection);

	router.route('/api/attendance/:id')
		.put(attendance.update)
		.delete(attendance.remove);
	
	router.route('/api/mailer') //mailing
		.post(mailer.send);

	/*router.all('*', function (req, res, next) {
		res.status(404).send('Nothing to do here.');
	});*/

	return router;	
};
