-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: mysqldb
-- Generation Time: Nov 02, 2021 at 10:38 AM
-- Server version: 8.0.25
-- PHP Version: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testvals`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`%` PROCEDURE `sp_incrementValue` (IN `IN_ROW_ID` VARCHAR(100))  BEGIN
	SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
	START TRANSACTION;
  IF EXISTS (SELECT 1 FROM `values_rec` WHERE `id` = IN_ROW_ID FOR UPDATE) THEN
    UPDATE `values_rec` SET `value` = CASE WHEN `value` % 2 = 0 THEN `value` + 3 ELSE `value` + 1 END WHERE `id` = IN_ROW_ID;
  ELSE 
    INSERT `values_rec`(`id`, `value`) VALUES (IN_ROW_ID, 1);
  END IF;
  COMMIT;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `values_rec`
--

CREATE TABLE `values_rec` (
  `id` varchar(100) NOT NULL,
  `value` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `values_rec`
--
ALTER TABLE `values_rec`
  ADD PRIMARY KEY (`id`);
COMMIT;

CALL sp_incrementValue("test_rec"); /* 1 */
CALL sp_incrementValue("test_rec_2"); /* 1 */
CALL sp_incrementValue("test_rec_2"); /* 2 */

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
