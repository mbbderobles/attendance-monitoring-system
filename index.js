var express = require('express');
var nodemailer = require('nodemailer');
var app = express();

app.use(require('body-parser')());
app.use(require('method-override')());
app.use(require(__dirname + '/config/router')(express.Router()));
app.use(express.static(__dirname + '/public'));

var server = app.listen(3000, function(){
	var port = server.address().port;

	console.log('App running at port %s', port);
});
