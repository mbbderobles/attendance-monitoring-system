var mysql = require('mysql');

module.exports = mysql.createConnection({
		host     : 'localhost',
		user     : 'admin',
		password : 'password1234',
		database : 'ams'
});