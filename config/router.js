var teacher = require('./../controllers/teacher');
var course = require('./../controllers/course');

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

	/*router.all('*', function (req, res, next) {
		res.status(404).send('Nothing to do here.');
	});*/

	return router;	
};