-- CREATE USER 'admin'@'localhost' IDENTIFIED BY 'password1234';
-- CREATE DATABASE ams;
-- GRANT ALL ON ams.* TO 'admin'@'localhost';

DROP TABLE IF EXISTS user;
CREATE TABLE user(
    id int(11) AUTO_INCREMENT,
    firstName varchar(256),
    middleName varchar(256),
    lastName varchar(256) NOT NULL,
    emailAddress varchar(256) NOT NULL,
    PRIMARY KEY(id)
);

DROP TABLE IF EXISTS admin;
CREATE TABLE admin(
    id int(11) NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO user (firstName, middleName, lastName, emailAddress) VALUES ("Marie Betel", "Baduel", "de Robles", "mbbderobles@gmail.com");
INSERT INTO admin (id) SELECT id FROM user WHERE emailAddress="mbbderobles@gmail.com";
INSERT INTO user (firstName, middleName, lastName, emailAddress) VALUES ("Shiela Kathleen", "Lanuzo", "Borja", "shielakathleenborja@gmail.com");
INSERT INTO admin (id) SELECT id FROM user WHERE emailAddress="shielakathleenborja@gmail.com";
INSERT INTO user (firstName, middleName, lastName, emailAddress) VALUES ("Mark Froilan", "Bunao", "Tandoc", "markfroilantandoc@gmail.com");
INSERT INTO admin (id) SELECT id FROM user WHERE emailAddress="markfroilantandoc@gmail.com";

DROP TABLE IF EXISTS student;
CREATE TABLE student(
    id int(11) NOT NULL,
    studentNumber varchar(10) NOT NULL,
    sex char,
    degree varchar(10),
    college varchar(10),
    PRIMARY KEY(studentNumber)
);

DROP TABLE IF EXISTS teacher;
CREATE TABLE teacher(
    id int(11) NOT NULL,
    employeeId varchar(11) NOT NULL,
    unit varchar(10),
    position varchar(30),
    PRIMARY KEY(employeeId)
);

DROP TABLE IF EXISTS course;
CREATE TABLE course(
    courseId int(10) AUTO_INCREMENT,
    courseNum varchar(10) NOT NULL,
    courseTitle varchar(256) NOT NULL,
    PRIMARY KEY(courseId)
);

DROP TABLE IF EXISTS section;
CREATE TABLE section(
    sectionId int(10) AUTO_INCREMENT,
    sectionCode varchar(10) NOT NULL,
    employeeId varchar(11),
    courseId int(10) NOT NULL,
    day varchar(8) NOT NULL,
    time varchar(32) NOT NULL,
    room varchar(20) NOT NULL,
    semester varchar(1) NOT NULL,
    year varchar(9) NOT NULL,
    maxAllowedAbsences int DEFAULT 0,
    combinedAbsences int DEFAULT 0,
    PRIMARY KEY(sectionId)
);

DROP TABLE IF EXISTS student_section;
CREATE TABLE student_section(
    id int(11) NOT NULL,
    sectionId int(10) NOT NULL,
    PRIMARY KEY(id, sectionId)
);


DROP TABLE IF EXISTS attendance_record;
CREATE TABLE attendance_record(
    attendanceId int(10) AUTO_INCREMENT,
    courseId int(10) NOT NULL,
    sectionId int(10) NOT NULL,
    studentNumber varchar(10) NOT NULL,
    attended TIMESTAMP NOT NULL,
    status varchar(10) DEFAULT 'Present',           -- Present, Absent, Excused
    PRIMARY KEY(attendanceId)
);

ALTER TABLE attendance_record CHANGE attended attended TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
