/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.5.5-10.1.28-MariaDB : Database - dentist
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`dentist` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `dentist`;

/*Table structure for table `den_customers` */

DROP TABLE IF EXISTS `den_customers`;

CREATE TABLE `den_customers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `dob` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` text COLLATE utf8_unicode_ci,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8_unicode_ci,
  `is_deleted` int(10) unsigned DEFAULT '0',
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `den_customers` */

insert  into `den_customers`(`id`,`name`,`dob`,`description`,`phone`,`address`,`is_deleted`,`image`,`created_at`,`updated_at`) values (2,'kasjnvkl','2016-10-25 21:40:36','qwewqeq','12454','qweqweeqw',0,'','2016-10-25 18:27:32','2016-10-25 18:40:36'),(3,'rida','2016-10-28 21:57:00','','','',0,'',NULL,NULL),(4,'brahim',NULL,'lkjNSDVgklsfdngvlzmfbvlkfdnb','1235468','bjhfklnkjshlkgaszpD;klngalkdng',0,NULL,'2016-11-09 20:38:31','2018-06-19 19:31:38'),(5,'dxfcgvhbjnkml,','2018-06-19 22:33:00',NULL,'gfseg',NULL,1,NULL,'2018-06-18 19:13:48','2018-06-19 19:33:00'),(6,'مريم','2018-06-19 22:32:11',NULL,NULL,NULL,1,NULL,'2018-06-18 19:14:06','2018-06-19 19:32:11'),(7,'ewwef',NULL,NULL,NULL,NULL,0,NULL,'2018-07-01 20:35:23','2018-07-01 20:35:23');

/*Table structure for table `den_schedule` */

DROP TABLE IF EXISTS `den_schedule`;

CREATE TABLE `den_schedule` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` int(10) unsigned DEFAULT NULL,
  `schedule_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `end_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `note` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `den_schedule_customer_id_foreign` (`customer_id`),
  CONSTRAINT `den_schedule_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `den_customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `den_schedule` */

insert  into `den_schedule`(`id`,`customer_id`,`schedule_date`,`end_date`,`note`,`created_at`,`updated_at`) values (1,2,'2016-10-28 20:59:01','0000-00-00 00:00:00','',NULL,NULL),(2,3,'2016-11-14 12:00:00','2016-11-14 12:30:00','','2016-11-13 10:46:51','2016-11-13 10:46:51'),(3,4,'2016-11-15 11:00:00','2016-11-15 11:30:00','','2016-11-13 10:46:58','2016-11-13 10:46:58');

/*Table structure for table `den_visit` */

DROP TABLE IF EXISTS `den_visit`;

CREATE TABLE `den_visit` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `customer_id` int(10) unsigned DEFAULT NULL,
  `code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `total` double NOT NULL,
  `payment` double NOT NULL DEFAULT '0',
  `rest` double NOT NULL,
  `date_visit` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `note` text COLLATE utf8_unicode_ci,
  `is_deleted` int(11) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `den_visit_customer_id_foreign` (`customer_id`),
  CONSTRAINT `den_visit_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `den_customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `den_visit` */

insert  into `den_visit`(`id`,`customer_id`,`code`,`status`,`total`,`payment`,`rest`,`date_visit`,`note`,`is_deleted`,`created_at`,`updated_at`) values (1,2,'2356',0,200000,50000,50000,'2018-07-05 22:17:25','jkshfngvasjbjjdshar',0,'2018-06-20 23:19:13','2018-07-05 19:17:25'),(2,2,'2356',0,0,0,0,'2018-06-21 21:49:15','',1,'2016-10-28 17:21:46','2018-06-21 18:49:15'),(3,4,'34',0,10000,5000,5000,'2018-07-05 22:36:44',NULL,0,'2016-11-09 20:39:38','2018-07-05 19:17:51');

/*Table structure for table `fm_cms_menu` */

DROP TABLE IF EXISTS `fm_cms_menu`;

CREATE TABLE `fm_cms_menu` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `is_active` int(11) NOT NULL,
  `order` int(11) NOT NULL,
  `url` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `parent` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `fm_cms_menu` */

insert  into `fm_cms_menu`(`id`,`name`,`is_active`,`order`,`url`,`parent`,`created_at`,`updated_at`) values (1,'Dashboard',1,1,'#/dashboard.html',0,NULL,NULL),(2,'Customers',1,2,'#/customers.html',0,NULL,NULL),(3,'Visits',1,3,'#/visits.html',0,NULL,NULL),(4,'Schedules',1,4,'#/schedules.html',0,NULL,NULL);

/*Table structure for table `fm_userinfo` */

DROP TABLE IF EXISTS `fm_userinfo`;

CREATE TABLE `fm_userinfo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `f_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `l_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `fm_userinfo_f_name_unique` (`f_name`),
  KEY `fm_userinfo_user_id_foreign` (`user_id`),
  CONSTRAINT `fm_userinfo_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `fm_userinfo` */

insert  into `fm_userinfo`(`id`,`user_id`,`f_name`,`l_name`,`phone`,`created_at`,`updated_at`) values (1,1,'sami','chkeir',534525,NULL,NULL);

/*Table structure for table `images` */

DROP TABLE IF EXISTS `images`;

CREATE TABLE `images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `visit_id` int(11) NOT NULL,
  `url` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=latin1;

/*Data for the table `images` */

insert  into `images`(`id`,`visit_id`,`url`,`created_at`,`updated_at`) values (108,1,'images/21184106911530818104.jpg','2018-07-05 19:15:05','2018-07-05 19:15:05'),(109,1,'images/8561216781530818108.jpg','2018-07-05 19:15:08','2018-07-05 19:15:08'),(110,1,'images/12595327881530818116.jpg','2018-07-05 19:15:16','2018-07-05 19:15:16'),(111,1,'images/17127593081530818116.jpg','2018-07-05 19:15:16','2018-07-05 19:15:16'),(112,1,'images/18393297271530818116.jpg','2018-07-05 19:15:16','2018-07-05 19:15:16'),(113,1,'images/14595794531530818245.jpg','2018-07-05 19:17:25','2018-07-05 19:17:25'),(114,3,'images/8218182491530818271.jpg','2018-07-05 19:17:51','2018-07-05 19:17:51'),(115,3,'images/9826712311530818271.jpg','2018-07-05 19:17:51','2018-07-05 19:17:51'),(116,3,'images/2047268381530818271.jpg','2018-07-05 19:17:51','2018-07-05 19:17:51');

/*Table structure for table `menu` */

DROP TABLE IF EXISTS `menu`;

CREATE TABLE `menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `url` varchar(50) DEFAULT NULL,
  `view` varchar(50) DEFAULT NULL,
  `controller` varchar(50) DEFAULT NULL,
  `parent_id` int(11) DEFAULT '0',
  `active` int(11) DEFAULT '1',
  `icon` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `menu` */

insert  into `menu`(`id`,`code`,`url`,`view`,`controller`,`parent_id`,`active`,`icon`,`created_at`,`updated_at`) values (1,'dashboard','#/dashboard','dashboard','DashboardController',0,1,'fa fa-home','2018-04-17 22:42:31','0000-00-00 00:00:00'),(2,'test','#',NULL,NULL,0,1,'fa fa-edit','2018-04-17 22:42:36','0000-00-00 00:00:00'),(3,'child','#/dashboard',NULL,NULL,2,1,'fa fa-edit','2018-04-17 22:42:35','0000-00-00 00:00:00'),(6,'pacients','#!/patients','pacients','PacientsController',0,1,'fa fa-user','2018-04-24 22:52:44','0000-00-00 00:00:00'),(7,'visits','#!/visits','visits','VisitsController',0,1,'fa fa-book-open','2018-06-20 22:10:52','0000-00-00 00:00:00'),(8,'operations','#!/operations','operations','OperationsController',0,1,'fa fa-gear','2018-07-10 21:43:02','0000-00-00 00:00:00');

/*Table structure for table `menu_i18` */

DROP TABLE IF EXISTS `menu_i18`;

CREATE TABLE `menu_i18` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_id` int(11) NOT NULL,
  `lang` varchar(3) DEFAULT 'en',
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

/*Data for the table `menu_i18` */

insert  into `menu_i18`(`id`,`menu_id`,`lang`,`name`,`created_at`,`updated_at`) values (1,1,'en','Dashboard','2018-04-13 23:23:24','0000-00-00 00:00:00'),(2,2,'en','test','2018-04-17 22:23:35','0000-00-00 00:00:00'),(3,3,'en','child','2018-04-17 22:23:40','0000-00-00 00:00:00'),(6,6,'en','Patients','2018-06-20 22:11:18','0000-00-00 00:00:00'),(7,7,'en','Visits','2018-06-20 22:11:11','0000-00-00 00:00:00'),(8,8,'en','Operations','2018-07-10 21:43:34','0000-00-00 00:00:00');

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `migrations` */

insert  into `migrations`(`migration`,`batch`) values ('2016_10_06_185617_user_table',1),('2016_10_06_190525_userinformation_table',1),('2016_10_06_185617_create_customer_table',2),('2016_10_06_191108_create_visit_table',2),('2016_10_17_173817_create_menu_cms_table',3),('2016_10_21_165628_create_schedule_Table',3),('2016_10_22_073350_create_items_table',3),('2016_10_23_193703_create_company_table',3),('2016_10_23_195425_create_fees_table',3),('2016_10_27_210455_add_schedule_end_date_to_schedule_Table',4),('2016_11_08_183914_create_track_table',4);

/*Table structure for table `operation_visit` */

DROP TABLE IF EXISTS `operation_visit`;

CREATE TABLE `operation_visit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `visit_id` int(11) NOT NULL,
  `operation_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=latin1;

/*Data for the table `operation_visit` */

insert  into `operation_visit`(`id`,`visit_id`,`operation_id`,`created_at`,`updated_at`) values (3,2,2,'2018-06-20 23:15:42','0000-00-00 00:00:00'),(117,1,1,'2018-07-05 19:17:25','2018-07-05 19:17:25'),(118,1,2,'2018-07-05 19:17:25','2018-07-05 19:17:25'),(119,1,3,'2018-07-05 19:17:25','2018-07-05 19:17:25'),(122,3,3,'2018-07-05 19:36:44','2018-07-05 19:36:44');

/*Table structure for table `operations` */

DROP TABLE IF EXISTS `operations`;

CREATE TABLE `operations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `color` varchar(50) DEFAULT NULL,
  `is_deleted` int(11) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `operations` */

insert  into `operations`(`id`,`name`,`color`,`is_deleted`,`created_at`,`updated_at`) values (1,'dsf','#4600ff',0,'2018-07-10 22:26:55','2018-07-10 19:26:55'),(2,'jkgk','#718822',0,'2018-07-10 22:40:05','2018-07-10 19:40:05'),(3,'ret','#eaf311',0,'2018-07-10 22:40:30','2018-07-10 19:40:30'),(4,'dxfcgvhbjnkml,','#008b22',0,'2018-07-10 19:28:59','2018-07-10 19:28:59');

/*Table structure for table `st_companies` */

DROP TABLE IF EXISTS `st_companies`;

CREATE TABLE `st_companies` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `st_companies` */

/*Table structure for table `st_fees` */

DROP TABLE IF EXISTS `st_fees`;

CREATE TABLE `st_fees` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `companies_id` int(10) unsigned DEFAULT NULL,
  `code` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `fees_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `price` double NOT NULL,
  `paid` double NOT NULL,
  `rest` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `st_fees_companies_id_foreign` (`companies_id`),
  CONSTRAINT `st_fees_companies_id_foreign` FOREIGN KEY (`companies_id`) REFERENCES `st_companies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `st_fees` */

/*Table structure for table `st_items` */

DROP TABLE IF EXISTS `st_items`;

CREATE TABLE `st_items` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `barcode` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `buy_price` double NOT NULL,
  `sell_price` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `st_items` */

/*Table structure for table `tooth_note` */

DROP TABLE IF EXISTS `tooth_note`;

CREATE TABLE `tooth_note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `visit_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `operations_id` varchar(200) DEFAULT NULL,
  `note` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=latin1;

/*Data for the table `tooth_note` */

insert  into `tooth_note`(`id`,`visit_id`,`title`,`operations_id`,`note`,`created_at`,`updated_at`) values (76,1,'tooth-12',NULL,'ascascasc','2018-07-05 19:17:25','2018-07-05 19:17:25'),(77,1,'tooth-11',NULL,'ascasc1111111','2018-07-05 19:17:25','2018-07-05 19:17:25'),(79,3,'tooth-26','1,2','test','2018-07-05 22:45:56','2018-07-05 19:36:44'),(80,3,'tooth-27',NULL,'tttt','2018-07-05 22:42:47','2018-07-05 19:36:44');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`username`,`email`,`type`,`password`,`remember_token`,`created_at`,`updated_at`) values (1,'admin','',NULL,'$2y$10$xl74v0.ThP6rRdGqwPe/7.Iuy2vhOOwQHSqFLdy3kkl2/Q/RPY.T2','Qv3WamkfbRaHgjNi83yjVbvwipD54KlCCXbOWt7utFslNjTRLxCHnxKPWV9P',NULL,NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
