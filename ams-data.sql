insert into user(firstName,middleName,lastName,emailAddress) values ('Juan','Manuel','dela Cruz','jmdc@gmail.com');
insert into user(firstName,lastName,emailAddress) values ('John','de Robles','jrderobles@gmail.com');
insert into user(firstName,lastName,emailAddress) values ('Geri','Delos Santos','sgds1234@gmail.com');
insert into user(firstName,middleName,lastName,emailAddress) values ('John James','Ocampo','Mondez','jjomondez@gmail.com');
insert into user(firstName,lastName,emailAddress) values ('John Ryan','Tarong','jrtarong@gmail.com');

insert into student values(6,'2013-12345','F','BSCS','CAS');
insert into student values(7,'2015-15532','M','BSEE','CEAT');
insert into student values(8,'2012-11112','F','BSN','CAS');
insert into student values(9,'2009-34543','M','BACA','CAS');
insert into student values(10,'2009-22248','M','BSCS','CAS');

-- STUDENTS
insert into user(firstName,lastName,emailAddress) values ('Abby','Rosales','abby_rosales@gmail.com');
insert into student values((select id from user where emailAddress='abby_rosales@gmail.com'),'200960855','F','BSChem','CAS');
insert into user(firstName,lastName,emailAddress) values ('Zinnia Kale','Malabuyoc','zkmalabuyoc@gmail.com');
insert into student values((select id from user where emailAddress='zkmalabuyoc@gmail.com'),'201149156','F','BSCS','CAS');
insert into user(firstName,lastName,emailAddress) values ('Roma Karmela','Rojas','rkrojas@gmail.com');
insert into student values((select id from user where emailAddress='rkrojas@gmail.com'),'200960974','F','BSCS','CAS');

-- ATTENDANCE	
insert into attendance_record(courseId,sectionId,studentNumber,attended) values(1,1,'201149156','2015-11-29');