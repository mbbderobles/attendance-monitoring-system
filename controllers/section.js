var	db = require(__dirname + '/../config/mysql');

exports.find = function(req, res, next) {
	db.query("SELECT * FROM section", function(err, rows) {
		if (err) return next(err);
		res.send(rows);
	});
};


exports.findOne = function(req, res, next) {
	db.query("SELECT * FROM section NATURAL JOIN course WHERE sectionId=?", [req.params.id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.status(404).send('Section not found.');
		} else {
			res.send(rows[0]);
		}
	});
};

exports.findSectionsByTeacher = function(req, res, next) {
	db.query("SELECT * FROM section NATURAL JOIN course NATURAL JOIN teacher NATURAL JOIN user WHERE employeeId=?", [req.params.id], function(err, rows) {
		if (err) return next(err);
		res.send(rows);
	});
};

exports.findAllByCourse = function(req, res, next) {
	db.query("SELECT * FROM section NATURAL JOIN course NATURAL JOIN teacher NATURAL JOIN user WHERE courseId=?", [req.params.id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.status(404).send('Section not found.');
		} else {
			res.send(rows);
		}
	});
};


exports.insert = function(req, res, next) {
	db.query("INSERT INTO section(sectionCode,employeeId,courseId,day,time,room,semester,year) VALUES(?,?,?,?,?,?,?,?)", [req.body.sectionCode,req.body.employeeId,req.body.courseId,req.body.day,req.body.time,req.body.room,req.body.semester,req.body.year], function(err, row) {
		if (err) return next(err);
		selectOne(row.insertId, function(newRow) {
			if (!newRow) {
				res.status(552).send('Section ('+ row.insertId +') was not created.');
			} else {
				res.send(newRow);
			}
		});
	});
};


exports.update = function(req, res, next) {
	db.query("UPDATE section SET ? WHERE sectionId=?", [req.body, req.params.id], function(err, rows) {
		if (err) return next(err);
		selectOne(req.params.id, function(updatedRow) {
			if (!updatedRow) {
				res.status(553).send('Section ('+req.params.id+') was not updated.');
			} else {
				res.send(updatedRow);
			}
		});
	});
};


exports.remove = function(req, res, next) {
	db.query("DELETE FROM section WHERE sectionId=?", [req.params.id], function(err, row) {
		if (err) return next(err);
		if (row.affectedRows === 0) {
			res.send(554, {message: 'Section ('+req.params.id+') was not removed.'});
		} else {
			res.send(row);
		}
		
	});
};


var selectOne = function(id, callback) {
	db.query("SELECT * FROM section WHERE sectionId=? LIMIT 1", [id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			callback(null);
		} else {
			callback(rows[0]);
		}
	});
}
