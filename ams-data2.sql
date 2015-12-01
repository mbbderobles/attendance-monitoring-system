-- MySQL dump 10.13  Distrib 5.6.27, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: ams
-- ------------------------------------------------------
-- Server version	5.6.27-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (4),(5),(6);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance_record`
--

DROP TABLE IF EXISTS `attendance_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attendance_record` (
  `attendanceId` int(10) NOT NULL AUTO_INCREMENT,
  `courseId` int(10) NOT NULL,
  `sectionId` int(10) NOT NULL,
  `studentNumber` varchar(10) NOT NULL,
  `attended` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int(11) DEFAULT '0',
  PRIMARY KEY (`attendanceId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance_record`
--

LOCK TABLES `attendance_record` WRITE;
/*!40000 ALTER TABLE `attendance_record` DISABLE KEYS */;
INSERT INTO `attendance_record` VALUES (1,1,1,'200960855','2015-11-28 16:00:00',0),(2,2,2,'201149156','2015-11-30 16:00:00',0),(3,1,1,'200960855','2015-12-04 16:00:00',0),(4,2,2,'200960974','2015-11-30 10:56:49',0),(5,1,1,'200960855','2015-11-30 16:00:00',0),(6,1,1,'200960855','2015-11-30 05:30:56',0),(7,1,1,'200960855','2015-11-28 05:10:56',0),(8,2,2,'200960974','2015-11-30 10:56:49',0),(9,2,2,'201149156','2015-11-30 10:56:49',0),(10,2,2,'200912345','2015-11-30 10:56:49',0),(11,1,1,'200960855','2015-12-02 05:14:56',0),(12,1,1,'201149156','2015-11-28 16:00:00',0);
/*!40000 ALTER TABLE `attendance_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course` (
  `courseId` int(10) NOT NULL AUTO_INCREMENT,
  `courseNum` varchar(10) NOT NULL,
  `courseTitle` varchar(256) NOT NULL,
  PRIMARY KEY (`courseId`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,'CHEM 200','Thesis'),(2,'CMSC 190-2','sp'),(3,'CMSC 2','Introduction to the Internet'),(4,'CMSC 11','Introduction to Computer Science'),(5,'CMSC 21','Fundamentals of Programming');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section`
--

DROP TABLE IF EXISTS `section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `section` (
  `sectionId` int(10) NOT NULL AUTO_INCREMENT,
  `sectionCode` varchar(10) NOT NULL,
  `employeeId` varchar(11) DEFAULT NULL,
  `courseId` int(10) NOT NULL,
  `day` varchar(8) NOT NULL,
  `time` varchar(32) NOT NULL,
  `room` varchar(20) NOT NULL,
  `semester` varchar(1) NOT NULL,
  `year` varchar(9) NOT NULL,
  `maxAllowedAbsences` int(11) DEFAULT '0',
  `combinedAbsences` int(11) DEFAULT '0',
  PRIMARY KEY (`sectionId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section`
--

LOCK TABLES `section` WRITE;
/*!40000 ALTER TABLE `section` DISABLE KEYS */;
INSERT INTO `section` VALUES (1,'E','009',1,'WF','13:00-14:00','ICS MH','2','2015-2016',0,0),(2,'F','007',1,'WF','15:00-16:00','ICS MH','2','2015-2016',0,0),(3,'E-2L','003',1,'Tue','13:00-16:00','PC Lab 2','2','2015-2016',0,0),(4,'E-1L','014',2,'Tue','10:00-13:00','PC Lab 2','2','2015-2016',0,0),(5,'F-1L','008',2,'Tue','13:00-16:00','PC Lab 6','2','2015-2016',0,0),(6,'U','022',2,'TTh','10:00-11:00','ICS LH 3','2','2015-2016',0,0);
/*!40000 ALTER TABLE `section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `studentNumber` varchar(10) NOT NULL,
  `sex` char(1) DEFAULT NULL,
  `degree` varchar(10) DEFAULT NULL,
  `college` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`studentNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (70,'200960855','F','BSCS','CAS'),(72,'200960974','F','BSCS','CAS'),(71,'201149156','F','BSCS','CAS');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_section`
--

DROP TABLE IF EXISTS `student_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student_section` (
  `id` int(11) NOT NULL,
  `sectionId` int(10) NOT NULL,
  PRIMARY KEY (`id`,`sectionId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_section`
--

LOCK TABLES `student_section` WRITE;
/*!40000 ALTER TABLE `student_section` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher` (
  `id` int(11) NOT NULL,
  `employeeId` varchar(11) NOT NULL,
  `unit` varchar(10) DEFAULT NULL,
  `position` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`employeeId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES (9,'003','',''),(8,'007','',''),(11,'008','',''),(7,'009','',''),(10,'014','',''),(13,'022','','');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(256) DEFAULT NULL,
  `middleName` varchar(256) DEFAULT NULL,
  `lastName` varchar(256) NOT NULL,
  `emailAddress` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (4,'Marie Betel','Baduel','de Robles','mbbderobles@gmail.com'),(5,'Shiela Kathleen','Lanuzo','Borja','shielakathleenborja@gmail.com'),(6,'Mark Froilan','Bunao','Tandoc','markfroilantandoc@gmail.com'),(7,'','','Vega','kvega@gmail.com'),(8,'','','Bawagan','jmbawagan@gmail.com'),(9,'','','Queliste','mquel@gmail.com'),(10,'','','Pelaez','kbpelaez@gmail.com'),(11,'','','Angeles','angeles@gmail.com'),(12,'','','Vega','kvega@gmail.com'),(13,'','','Magno','kmagno@gmail.com'),(14,'','','Pelaez','kbpelaez@gmail.com'),(15,'','','Pelaez','kbpelaez@gmail.com'),(16,'','','Vega','kvega@gmail.com'),(17,'','','Pelaez','kbpelaez@gmail.com'),(18,'','','Queliste','mquel@gmail.com'),(19,'','','Bawagan','jmbawagan@gmail.com'),(20,'','','Angeles','angeles@gmail.com'),(21,'','','Vega','kvega@gmail.com'),(22,'','','Magno','kmagno@gmail.com'),(23,'','','Pelaez','kbpelaez@gmail.com'),(24,'','','Pelaez','kbpelaez@gmail.com'),(25,'','','Vega','kvega@gmail.com'),(26,'','','Pelaez','kbpelaez@gmail.com'),(27,'','','Queliste','mquel@gmail.com'),(28,'','','Bawagan','jmbawagan@gmail.com'),(29,'','','Angeles','angeles@gmail.com'),(30,'','','Vega','kvega@gmail.com'),(31,'','','Magno','kmagno@gmail.com'),(32,'','','Pelaez','kbpelaez@gmail.com'),(33,'','','Pelaez','kbpelaez@gmail.com'),(34,'','','Vega','kvega@gmail.com'),(35,'','','Pelaez','kbpelaez@gmail.com'),(36,'','','Queliste','mquel@gmail.com'),(37,'','','Bawagan','jmbawagan@gmail.com'),(38,'','','Angeles','angeles@gmail.com'),(39,'','','Vega','kvega@gmail.com'),(40,'','','Magno','kmagno@gmail.com'),(41,'','','Pelaez','kbpelaez@gmail.com'),(42,'','','Pelaez','kbpelaez@gmail.com'),(43,'','','Vega','kvega@gmail.com'),(44,'','','Pelaez','kbpelaez@gmail.com'),(45,'','','Queliste','mquel@gmail.com'),(46,'','','Bawagan','jmbawagan@gmail.com'),(47,'','','Angeles','angeles@gmail.com'),(48,'','','Vega','kvega@gmail.com'),(49,'','','Magno','kmagno@gmail.com'),(50,'','','Pelaez','kbpelaez@gmail.com'),(51,'','','Pelaez','kbpelaez@gmail.com'),(52,'','','Vega','kvega@gmail.com'),(53,'','','Pelaez','kbpelaez@gmail.com'),(54,'','','Queliste','mquel@gmail.com'),(55,'','','Bawagan','jmbawagan@gmail.com'),(56,'','','Angeles','angeles@gmail.com'),(57,'','','Vega','kvega@gmail.com'),(58,'','','Magno','kmagno@gmail.com'),(59,'','','Pelaez','kbpelaez@gmail.com'),(60,'','','Pelaez','kbpelaez@gmail.com'),(61,'','','Vega','kvega@gmail.com'),(62,'','','Pelaez','kbpelaez@gmail.com'),(63,'','','Queliste','mquel@gmail.com'),(64,'','','Bawagan','jmbawagan@gmail.com'),(65,'','','Angeles','angeles@gmail.com'),(66,'','','Vega','kvega@gmail.com'),(67,'','','Magno','kmagno@gmail.com'),(68,'','','Pelaez','kbpelaez@gmail.com'),(69,'','','Pelaez','kbpelaez@gmail.com'),(70,'Abby',NULL,'Rosales','abby_rosales@gmail.com'),(71,'Zinnia Kale',NULL,'Malabuyoc','zkmalabuyoc@gmail.com'),(72,'Roma Karmela',NULL,'Rojas','rkrojas@gmail.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-12-01 11:44:54
