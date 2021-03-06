var	db = require(__dirname + '/../config/mysql');

exports.find = function(req, res, next) {
	db.query("SELECT * FROM teacher NATURAL JOIN user", function(err, rows) {
		if (err) return next(err);
		res.send(rows);
	});
};


exports.findOne = function(req, res, next) {
	db.query("SELECT * FROM teacher NATURAL JOIN user WHERE id=?", [req.params.id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			res.status(404).send('Teacher not found.');
		} else {
			res.send(rows[0]);
		}
	});
};


exports.insert = function(req, res, next) {
	db.query("INSERT INTO teacher(id,employeeId,unit,position) VALUES(?,?,?,?)", [req.body.id, req.body.employeeId, req.body.unit, req.body.position], function(err, row) {
		if (err) return next(err);
		selectOne(req.body.id, function(newRow) {
			if (!newRow) {
				res.status(552).send('Teacher ('+req.body.id+') was not created.');
			} else {
				res.send(newRow);
			}
		});
	});
};


exports.update = function(req, res, next) {
	db.query("UPDATE teacher SET ? WHERE id=?", [req.body, req.params.id], function(err, rows) {
		if (err) return next(err);
		selectOne(req.params.id, function(updatedRow) {
			if (!updatedRow) {
				res.status(553).send('Teacher ('+req.params.id+') was not updated.');
			} else {
				res.send(updatedRow);
			}
		});
	});
};


exports.remove = function(req, res, next) {
	db.query("DELETE FROM teacher WHERE id=?", [req.params.id], function(err, row) {
		if (err) return next(err);
		if (row.affectedRows === 0) {
			res.send(554, {message: 'Teacher ('+req.params.id+') was not removed.'});
		} else {
			res.send(row);
		}
		
	});
};


var selectOne = function(id, callback) {
	db.query("SELECT * FROM teacher WHERE id=? LIMIT 1", [id], function(err, rows) {
		if (err) return next(err);
		if (rows.length === 0) {
			callback(null);
		} else {
			callback(rows[0]);
		}
	});
}