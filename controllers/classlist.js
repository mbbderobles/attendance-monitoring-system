var	db = require(__dirname + '/../config/mysql');

exports.find = function(req, res, next) {
	db.query("SELECT * FROM student_section", function(err, rows) {
		if (err) return next(err);
		res.send(rows);
	});
};


exports.findStudentsBySection = function(req, res, next) {
	db.query("SELECT * FROM student_section NATURAL JOIN student NATURAL JOIN user NATURAL JOIN section NATURAL JOIN course WHERE sectionId=? ORDER BY lastName ASC", [req.params.id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.status(404).send('Record not found.');
		} else {
			res.send(rows);
		}
	});
};

exports.findStudentsNotEnrolledInSection = function(req, res, next) {
	db.query("SELECT * FROM student NATURAL JOIN user WHERE studentNumber NOT IN (SELECT studentNumber FROM student_section WHERE sectionId=?) ORDER BY lastName ASC", [req.params.id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.status(404).send('Record not found.');
		} else {
			res.send(rows);
		}
	});
};

exports.findSectionsOfStudent = function(req, res, next) {
	db.query("SELECT * FROM student_section NATURAL JOIN section NATURAL JOIN course NATURAL JOIN student NATURAL JOIN user WHERE studentNumber=?", [req.params.id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.status(404).send('Record not found.');
		} else {
			res.send(rows);
		}
	});
};


exports.insert = function(req, res, next) {
	db.query("INSERT INTO student_section(studentNumber,sectionId) VALUES(?,?)", [req.body.studentNumber, req.body.sectionId], function(err, row) {
		if (err) return next(err);
		selectOne(row.insertId, function(newRow) {
			if (!newRow) {
				res.status(552).send('Record ('+ row.insertId +') was not created.');
			} else {
				res.send(newRow);
			}
		});
	});
};


exports.update = function(req, res, next) {
	db.query("UPDATE student_section SET ? WHERE studentSectionId=?", [req.params.id], function(err, rows) {
		if (err) return next(err);
		selectOne(row.insertId, function(updatedRow) {
			if (!updatedRow) {
				res.status(553).send('Record ('+row.insertId+') was not updated.');
			} else {
				res.send(updatedRow);
			}
		});
	});
};


exports.remove = function(req, res, next) {
	db.query("DELETE FROM student_section WHERE studentSectionId=?", [req.params.id], function(err, row) {
		if (err) return next(err);
		if (row.affectedRows === 0) {
			res.send(554, {message: 'Record ('+row.insertId+') was not removed.'});
		} else {
			res.send(row);
		}
		
	});
};


var selectOne = function(id, callback) {
	db.query("SELECT * FROM student_section WHERE studentSectionId=? LIMIT 1", [id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			callback(null);
		} else {
			callback(rows[0]);
		}
	});
}