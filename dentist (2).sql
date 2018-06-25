-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 22, 2018 at 09:26 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dentist`
--

-- --------------------------------------------------------

--
-- Table structure for table `den_customers`
--

CREATE TABLE `den_customers` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `dob` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` text COLLATE utf8_unicode_ci,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8_unicode_ci,
  `is_deleted` int(10) UNSIGNED DEFAULT '0',
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `den_customers`
--

INSERT INTO `den_customers` (`id`, `name`, `dob`, `description`, `phone`, `address`, `is_deleted`, `image`, `created_at`, `updated_at`) VALUES
(2, 'kasjnvkl', '2016-10-25 18:40:36', 'qwewqeq', '12454', 'qweqweeqw', 0, '', '2016-10-25 15:27:32', '2016-10-25 15:40:36'),
(3, 'rida', '2016-10-28 18:57:00', '', '', '', 0, '', NULL, NULL),
(4, 'brahim', NULL, 'lkjNSDVgklsfdngvlzmfbvlkfdnb', '1235468', 'bjhfklnkjshlkgaszpD;klngalkdng', 0, NULL, '2016-11-09 18:38:31', '2018-06-19 16:31:38'),
(5, 'dxfcgvhbjnkml,', '2018-06-19 19:33:00', NULL, 'gfseg', NULL, 1, NULL, '2018-06-18 16:13:48', '2018-06-19 16:33:00'),
(6, 'مريم', '2018-06-19 19:32:11', NULL, NULL, NULL, 1, NULL, '2018-06-18 16:14:06', '2018-06-19 16:32:11');

-- --------------------------------------------------------

--
-- Table structure for table `den_schedule`
--

CREATE TABLE `den_schedule` (
  `id` int(10) UNSIGNED NOT NULL,
  `customer_id` int(10) UNSIGNED DEFAULT NULL,
  `schedule_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `end_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `note` text COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `den_schedule`
--

INSERT INTO `den_schedule` (`id`, `customer_id`, `schedule_date`, `end_date`, `note`, `created_at`, `updated_at`) VALUES
(1, 2, '2016-10-28 17:59:01', '0000-00-00 00:00:00', '', NULL, NULL),
(2, 3, '2016-11-14 10:00:00', '2016-11-14 10:30:00', '', '2016-11-13 08:46:51', '2016-11-13 08:46:51'),
(3, 4, '2016-11-15 09:00:00', '2016-11-15 09:30:00', '', '2016-11-13 08:46:58', '2016-11-13 08:46:58');

-- --------------------------------------------------------

--
-- Table structure for table `den_visit`
--

CREATE TABLE `den_visit` (
  `id` int(10) UNSIGNED NOT NULL,
  `customer_id` int(10) UNSIGNED DEFAULT NULL,
  `code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `total` double NOT NULL,
  `payment` double NOT NULL DEFAULT '0',
  `rest` double NOT NULL,
  `date_visit` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `note` text COLLATE utf8_unicode_ci,
  `is_deleted` int(11) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `den_visit`
--

INSERT INTO `den_visit` (`id`, `customer_id`, `code`, `status`, `total`, `payment`, `rest`, `date_visit`, `note`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 2, '2356', 0, 100000, 50000, 50000, '2018-06-22 19:09:48', 'jkshfngvasjbjjdshar', 0, '2018-06-20 20:19:13', '2018-06-22 16:09:48'),
(2, 2, '2356', 0, 0, 0, 0, '2018-06-21 18:49:15', '', 1, '2016-10-28 14:21:46', '2018-06-21 15:49:15'),
(3, 4, '34', 0, 10000, 5000, 5000, '2018-06-22 19:09:36', NULL, 0, '2016-11-09 18:39:38', '2018-06-22 16:09:36');

-- --------------------------------------------------------

--
-- Table structure for table `fm_cms_menu`
--

CREATE TABLE `fm_cms_menu` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `is_active` int(11) NOT NULL,
  `order` int(11) NOT NULL,
  `url` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `parent` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `fm_cms_menu`
--

INSERT INTO `fm_cms_menu` (`id`, `name`, `is_active`, `order`, `url`, `parent`, `created_at`, `updated_at`) VALUES
(1, 'Dashboard', 1, 1, '#/dashboard.html', 0, NULL, NULL),
(2, 'Customers', 1, 2, '#/customers.html', 0, NULL, NULL),
(3, 'Visits', 1, 3, '#/visits.html', 0, NULL, NULL),
(4, 'Schedules', 1, 4, '#/schedules.html', 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `fm_userinfo`
--

CREATE TABLE `fm_userinfo` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `f_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `l_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `fm_userinfo`
--

INSERT INTO `fm_userinfo` (`id`, `user_id`, `f_name`, `l_name`, `phone`, `created_at`, `updated_at`) VALUES
(1, 1, 'sami', 'chkeir', 534525, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `visit_id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `note` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id` int(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  `url` varchar(50) DEFAULT NULL,
  `view` varchar(50) DEFAULT NULL,
  `controller` varchar(50) DEFAULT NULL,
  `parent_id` int(11) DEFAULT '0',
  `active` int(11) DEFAULT '1',
  `icon` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id`, `code`, `url`, `view`, `controller`, `parent_id`, `active`, `icon`, `created_at`, `updated_at`) VALUES
(1, 'dashboard', '#/dashboard', 'dashboard', 'DashboardController', 0, 1, 'fa fa-home', '2018-04-17 19:42:31', '0000-00-00 00:00:00'),
(2, 'test', '#', NULL, NULL, 0, 1, 'fa fa-edit', '2018-04-17 19:42:36', '0000-00-00 00:00:00'),
(3, 'child', '#/dashboard', NULL, NULL, 2, 1, 'fa fa-edit', '2018-04-17 19:42:35', '0000-00-00 00:00:00'),
(6, 'pacients', '#!/patients', 'pacients', 'PacientsController', 0, 1, 'fa fa-user', '2018-04-24 19:52:44', '0000-00-00 00:00:00'),
(7, 'visits', '#!/visits', 'visits', 'VisitsController', 0, 1, 'fa fa-book-open', '2018-06-20 19:10:52', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `menu_i18`
--

CREATE TABLE `menu_i18` (
  `id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `lang` varchar(3) DEFAULT 'en',
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `menu_i18`
--

INSERT INTO `menu_i18` (`id`, `menu_id`, `lang`, `name`, `created_at`, `updated_at`) VALUES
(1, 1, 'en', 'Dashboard', '2018-04-13 20:23:24', '0000-00-00 00:00:00'),
(2, 2, 'en', 'test', '2018-04-17 19:23:35', '0000-00-00 00:00:00'),
(3, 3, 'en', 'child', '2018-04-17 19:23:40', '0000-00-00 00:00:00'),
(6, 6, 'en', 'Patients', '2018-06-20 19:11:18', '0000-00-00 00:00:00'),
(7, 7, 'en', 'Visits', '2018-06-20 19:11:11', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`migration`, `batch`) VALUES
('2016_10_06_185617_user_table', 1),
('2016_10_06_190525_userinformation_table', 1),
('2016_10_06_185617_create_customer_table', 2),
('2016_10_06_191108_create_visit_table', 2),
('2016_10_17_173817_create_menu_cms_table', 3),
('2016_10_21_165628_create_schedule_Table', 3),
('2016_10_22_073350_create_items_table', 3),
('2016_10_23_193703_create_company_table', 3),
('2016_10_23_195425_create_fees_table', 3),
('2016_10_27_210455_add_schedule_end_date_to_schedule_Table', 4),
('2016_11_08_183914_create_track_table', 4);

-- --------------------------------------------------------

--
-- Table structure for table `operations`
--

CREATE TABLE `operations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_deleted` int(11) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `operations`
--

INSERT INTO `operations` (`id`, `name`, `is_deleted`, `created_at`, `updated_at`) VALUES
(1, 'dsf', 0, '2018-06-20 20:15:15', '0000-00-00 00:00:00'),
(2, 'jkgk', 0, '2018-06-20 20:15:22', '0000-00-00 00:00:00'),
(3, 'ret', 0, '2018-06-20 20:15:20', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `operation_visit`
--

CREATE TABLE `operation_visit` (
  `id` int(11) NOT NULL,
  `visit_id` int(11) NOT NULL,
  `operation_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `operation_visit`
--

INSERT INTO `operation_visit` (`id`, `visit_id`, `operation_id`, `created_at`, `updated_at`) VALUES
(3, 2, 2, '2018-06-20 20:15:42', '0000-00-00 00:00:00'),
(11, 3, 3, '2018-06-22 16:09:36', '2018-06-22 16:09:36'),
(12, 1, 1, '2018-06-22 16:09:48', '2018-06-22 16:09:48'),
(13, 1, 2, '2018-06-22 16:09:48', '2018-06-22 16:09:48'),
(14, 1, 3, '2018-06-22 16:09:48', '2018-06-22 16:09:48');

-- --------------------------------------------------------

--
-- Table structure for table `st_companies`
--

CREATE TABLE `st_companies` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `st_fees`
--

CREATE TABLE `st_fees` (
  `id` int(10) UNSIGNED NOT NULL,
  `companies_id` int(10) UNSIGNED DEFAULT NULL,
  `code` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `fees_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `price` double NOT NULL,
  `paid` double NOT NULL,
  `rest` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `st_items`
--

CREATE TABLE `st_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `barcode` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `buy_price` double NOT NULL,
  `sell_price` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `type`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'admin', '', NULL, '$2y$10$xl74v0.ThP6rRdGqwPe/7.Iuy2vhOOwQHSqFLdy3kkl2/Q/RPY.T2', 'Qv3WamkfbRaHgjNi83yjVbvwipD54KlCCXbOWt7utFslNjTRLxCHnxKPWV9P', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `den_customers`
--
ALTER TABLE `den_customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `den_schedule`
--
ALTER TABLE `den_schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `den_schedule_customer_id_foreign` (`customer_id`);

--
-- Indexes for table `den_visit`
--
ALTER TABLE `den_visit`
  ADD PRIMARY KEY (`id`),
  ADD KEY `den_visit_customer_id_foreign` (`customer_id`);

--
-- Indexes for table `fm_cms_menu`
--
ALTER TABLE `fm_cms_menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fm_userinfo`
--
ALTER TABLE `fm_userinfo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `fm_userinfo_f_name_unique` (`f_name`),
  ADD KEY `fm_userinfo_user_id_foreign` (`user_id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `menu_i18`
--
ALTER TABLE `menu_i18`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `operations`
--
ALTER TABLE `operations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `operation_visit`
--
ALTER TABLE `operation_visit`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `st_companies`
--
ALTER TABLE `st_companies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `st_fees`
--
ALTER TABLE `st_fees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `st_fees_companies_id_foreign` (`companies_id`);

--
-- Indexes for table `st_items`
--
ALTER TABLE `st_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `den_customers`
--
ALTER TABLE `den_customers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `den_schedule`
--
ALTER TABLE `den_schedule`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `den_visit`
--
ALTER TABLE `den_visit`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `fm_cms_menu`
--
ALTER TABLE `fm_cms_menu`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `fm_userinfo`
--
ALTER TABLE `fm_userinfo`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `menu_i18`
--
ALTER TABLE `menu_i18`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `operations`
--
ALTER TABLE `operations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `operation_visit`
--
ALTER TABLE `operation_visit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `st_companies`
--
ALTER TABLE `st_companies`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `st_fees`
--
ALTER TABLE `st_fees`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `st_items`
--
ALTER TABLE `st_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `den_schedule`
--
ALTER TABLE `den_schedule`
  ADD CONSTRAINT `den_schedule_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `den_customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `den_visit`
--
ALTER TABLE `den_visit`
  ADD CONSTRAINT `den_visit_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `den_customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `fm_userinfo`
--
ALTER TABLE `fm_userinfo`
  ADD CONSTRAINT `fm_userinfo_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `st_fees`
--
ALTER TABLE `st_fees`
  ADD CONSTRAINT `st_fees_companies_id_foreign` FOREIGN KEY (`companies_id`) REFERENCES `st_companies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
