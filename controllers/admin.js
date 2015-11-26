var	db = require(__dirname + '/../config/mysql');

exports.find = function(req, res, next) {
	db.query("SELECT * FROM admin NATURAL JOIN user", function(err, rows) {
		if (err) return next(err);
		res.send(rows);
	});
};


exports.findOne = function(req, res, next) {
	db.query("SELECT * FROM admin NATURAL JOIN user WHERE id=?", [req.params.id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.status(404).send('Admin not found.');
		} else {
			res.send(rows[0]);
		}
	});
};
