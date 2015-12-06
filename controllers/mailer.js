var nodemailer = require('nodemailer');
var	db = require(__dirname + '/../config/mysql');

var transporter = nodemailer.createTransport({
	service:'gmail',
	auth: {
	    	user: 'attendancemonitoring.confirm@gmail.com',
	    	pass: 'password1234it210'
	}

});

exports.send = function(req, res, next){
	//console.log("INSIDE SEND FUNCTION");
	var linkadd="10.0.3.200.xip.io";
	var course_sec=req.body.section.courseNum+' '+req.body.section.sectionCode;

	if(req.body.type>0)
	{
		var u_type='student';
		
		var htmlContent = '<p>Hi '+req.body.firstName+' '+req.body.middleName+' '+ req.body.lastName+', </p>'+
				'<p>Welcome to <a href="'+linkadd+'">ATMOST:ATtendance MOnitoring SysTem</a>!</p>'+
				'<p> You are currently enrolled in '+course_sec+'. Do not forget to update your profile <a href="'+linkadd+'">here</a>.</p>'+
				'<p> Enjoy!</p>'+
				'<p> Best,</p>'+'<p> The ATMOST Accounts Team</p>';

	}
	else
	{
		var u_type='teacher';
		//var course_sec=req.body.section;
		var htmlContent = '<p>Hi '+req.body.firstName+' '+req.body.middleName+' '+ req.body.lastName+', </p>'+
				'<p>Welcome to <a href="'+linkadd+'">ATMOST:ATtendance MOnitoring SysTem</a>!</p>'+
				'<p> You are currently teaching '+course_sec+'. Do not forget to update your profile <a href="'+linkadd+'">here</a>.</p>'+
				'<p> Enjoy!</p>'+
				'<p> Best,</p>'+'<p> The ATMOST Accounts Team</p>';
	};


	 var mailOptions = {
	    to: req.body.emailAddress,                  // your email here
	    subject: 'ATMOST: New Course Added',
	    from: 'attendancemonitoring.confirm@gmail.com',
	    sender: 'ATMOST Accounts Team <attendancemonitoring.confirm@gmail.com>',
	    html: htmlContent
	  };
	  transporter.sendMail(mailOptions, function(err, info){
	    if (err) {
	      console.log(err);
	    }else{
	      console.log('Message sent: ' + info.response);
	      return res.json(201, info);
	    }
	  });
};
