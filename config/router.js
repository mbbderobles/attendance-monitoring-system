var teacher = require('./../controllers/teacher');
var course = require('./../controllers/course');
var user = require('./../controllers/user');

module.exports = function(router) {

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

	router.route('/api/users')
		.get(user.find)
		.post(user.insert);

	router.route('/api/users/:id')
		.get(user.findOne)
		.put(user.update)
		.delete(user.remove);

	/*router.all('*', function (req, res, next) {
		res.status(404).send('Nothing to do here.');
	});*/

	return router;	
};