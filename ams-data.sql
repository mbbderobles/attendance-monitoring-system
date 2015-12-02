-- STUDENTS
insert into user(firstName,lastName,emailAddress) values ('Abby','Rosales','abby_rosales@gmail.com');
insert into student values((select id from user where emailAddress='abby_rosales@gmail.com'),'2009-60855','F','BSChem','CAS');
insert into user(firstName,lastName,emailAddress) values ('Zinnia Kale','Malabuyoc','zkmalabuyoc@gmail.com');
insert into student values((select id from user where emailAddress='zkmalabuyoc@gmail.com'),'2011-49156','F','BSCS','CAS');
insert into user(firstName,lastName,emailAddress) values ('Roma Karmela','Rojas','rkrojas@gmail.com');
insert into student values((select id from user where emailAddress='rkrojas@gmail.com'),'2009-60974','F','BSCS','CAS');
insert into user(firstName,middleName,lastName,emailAddress) values ('Juan','Manuel','dela Cruz','jmdc@gmail.com');
insert into student values((select id from user where emailAddress='jmdc@gmail.com'),'2011-61214','M','BSStat','CAS');
insert into user(firstName,middleName,lastName,emailAddress) values ('John James','Ocampo','Mondez','jjomondez@gmail.com');
insert into student values((select id from user where emailAddress='jjomondez@gmail.com'),'2010-32214','M','BSStat','CAS');
insert into user(firstName,middleName,lastName,emailAddress) values ('Marie','de Robles','marie.betel@gmail.com');
insert into student values((select id from user where emailAddress='marie.betel@gmail.com'),'2015-12345','F','BSCS','CAS');
insert into user(firstName,middleName,lastName,emailAddress) values ('Jejomar','Binay','jejbinay@gmail.com');
insert into student values((select id from user where emailAddress='jejbinay@gmail.com'),'2009-14555','M','BSEE','CEAT');
insert into user(firstName,middleName,lastName,emailAddress) values ('Grace','Poe','gpoewz@gmail.com');
insert into student values((select id from user where emailAddress='gpoewz@gmail.com'),'2015-12086','F','BSEE','CEAT');
insert into user(firstName,middleName,lastName,emailAddress) values ('Korina','Sanchez','kkksanchez@gmail.com');
insert into student values((select id from user where emailAddress='kkksanchez@gmail.com'),'2009-68833','F','BSDC','CDC');
insert into user(firstName,middleName,lastName,emailAddress) values ('Mar','Roxas','marroxas@gmail.com');
insert into student values((select id from user where emailAddress='marroxas@gmail.com'),'2009-55430','M','BSCA','CAS');
insert into user(firstName,middleName,lastName,emailAddress) values ('Rodrigo','Duterte','roddu30@gmail.com');
insert into student values((select id from user where emailAddress='roddu30@gmail.com'),'2009-63244','M','BSDC','CDC');
insert into user(firstName,middleName,lastName,emailAddress) values ('Miriam','Santiago','msantiago@gmail.com');
insert into student values((select id from user where emailAddress='msantiago@gmail.com'),'2009-77777','F','BSBio','CAS');
insert into user(firstName,middleName,lastName,emailAddress) values ('Heart','Evangelista','hevangelista@gmail.com');
insert into student values((select id from user where emailAddress='hevangelista@gmail.com'),'2015-44321','F','BSCE','CEAT');
insert into user(firstName,middleName,lastName,emailAddress) values ('Leslie','Cledera','lcledera@gmail.com');
insert into student values((select id from user where emailAddress='lcledera@gmail.com'),'2010-44329','F','BSN','CHE');


insert into section values('2015-12345', 1);
insert into section values('2011-61214', 1);
insert into section values('2010-32214', 1);
insert into section values('2009-60855', 1);
insert into section values('2011-49156', 1);
insert into section values('2010-32214', 2);