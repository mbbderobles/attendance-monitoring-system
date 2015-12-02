var	db = require(__dirname + '/../config/mysql');

exports.find = function(req, res, next) {
	console.log('find');
	db.query("SELECT * FROM attendance_record", function(err, rows) {
		if (err) return next(err);
		res.send(rows);
	});
};


exports.findBySection = function(req, res, next) {
	db.query("SELECT * FROM attendance_record NATURAL JOIN student NATURAL JOIN user WHERE sectionId=?", [req.params.id], function(err, rows) {
		if (err) return next(err);
		res.send(rows);
	});
};

exports.findStudentsBySection = function(req, res, next) {
	db.query("SELECT DISTINCT studentNumber,firstName,lastName FROM attendance_record NATURAL JOIN student NATURAL JOIN user WHERE sectionId=?", [req.params.id], function(err, rows) {
		if (err) return next(err);
		res.send(rows);
	});
};

exports.findOne = function(req, res, next) {
	db.query("SELECT * FROM attendance_record WHERE attended=? AND studentNumber=? AND sectionId=?", [req.body.attended,req.body.studentNumber,req.body.sectionId], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.status(404).send('Attendance not found.');
		} else {
			res.send(rows[0]);
		}
	});
};


exports.insert = function(req, res, next) {
	db.query("INSERT INTO attendance_record(courseId,sectionId,studentNumber,attended,status) VALUES(?,?,?,?,?)", [req.body.courseId, req.body.sectionId, req.body.studentNumber, req.body.attended, req.body.status], function(err, row) {
		if (err) return next(err);
		selectOne(row.insertId, function(newRow) {
			if (!newRow) {
				res.status(552).send('Attendance ('+ row.insertId +') was not created.');
			} else {
				res.send(newRow);
			}
		});
	});
};


exports.update = function(req, res, next) {
	db.query("UPDATE attendance_record SET ? WHERE attendanceId=? ", [req.body, req.params.id], function(err, rows) {
		if (err) return next(err);
		selectOne(req.params.id, function(updatedRow) {
			if (!updatedRow) {
				res.status(553).send('Attendance ('+req.params.id+') was not updated.');
			} else {
				res.send(updatedRow);
			}
		});
	});
};


exports.remove = function(req, res, next) {
	db.query("DELETE FROM attendance_record WHERE attendanceId=?", [req.params.id], function(err, row) {
		if (err) return next(err);
		if (row.affectedRows === 0) {
			res.send(554, {message: 'Attendance ('+req.params.id+') was not removed.'});
		} else {
			res.send(row);
		}
		
	});
};


var selectOne = function(id, callback) {
	db.query("SELECT * FROM attendance_record WHERE attendanceId=? LIMIT 1", [id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			callback(null);
		} else {
			callback(rows[0]);
		}
	});
}