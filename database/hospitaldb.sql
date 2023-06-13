-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 13, 2023 at 07:47 AM
-- Server version: 8.0.31
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospitaldb`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `admittedpatients` ()   BEGIN
    SELECT * FROM PAT_ADMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `OccupiedRooms` ()   BEGIN 
    SELECT * FROM ROOM_DETAILS WHERE status = 'Y';
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `VacantRooms` ()   BEGIN 
    SELECT * FROM ROOM_DETAILS WHERE status = 'N';
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `all_doctors`
--

CREATE TABLE `all_doctors` (
  `identity_number` varchar(10) NOT NULL,
  `doctor_name` varchar(200) NOT NULL,
  `department_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `all_doctors`
--

INSERT INTO `all_doctors` (`identity_number`, `doctor_name`, `department_name`) VALUES
('DC001', 'Dr. Mark Wilson', 'Cardiology'),
('DC002', 'Dr. Emily Brown', 'Orthopedics'),
('DR001', 'Dr. John Smith', 'Cardiology'),
('DR002', 'Dr. Jane Doe', 'Orthopedics'),
('DR003', 'Dr. David Johnson', 'Dermatology');

--
-- Triggers `all_doctors`
--
DELIMITER $$
CREATE TRIGGER `check_identity_number` BEFORE INSERT ON `all_doctors` FOR EACH ROW BEGIN
  IF (NEW.identity_number NOT LIKE 'DR%' AND NEW.identity_number NOT LIKE 'DC%') THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid doctor number';
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `check_identity_number_update` BEFORE UPDATE ON `all_doctors` FOR EACH ROW BEGIN
  IF (NEW.identity_number NOT LIKE 'DR%' AND NEW.identity_number NOT LIKE 'DC%') THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid doctor number';
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `audit_table`
--

CREATE TABLE `audit_table` (
  `patient_number` varchar(10) NOT NULL,
  `doctor_number` varchar(10) NOT NULL,
  `date_admitted` date NOT NULL,
  `date_discharged` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `audit_table`
--

INSERT INTO `audit_table` (`patient_number`, `doctor_number`, `date_admitted`, `date_discharged`) VALUES
('PT001', 'DR001', '2022-01-15', '2022-01-23'),
('PT002', 'DR002', '2022-02-20', '2022-02-20');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `department_name` varchar(200) NOT NULL,
  `department_location` varchar(200) NOT NULL,
  `facilities_available` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`department_name`, `department_location`, `facilities_available`) VALUES
('Cardiology', 'Building A, 2nd Floor', 'EKG, Echocardiography'),
('Dermatology', 'Building C, 1st Floor', 'Skin biopsy'),
('Orthopedics', 'Building B, 2nd Floor', 'X-ray, MRI');

-- --------------------------------------------------------

--
-- Table structure for table `doc_on_call`
--

CREATE TABLE `doc_on_call` (
  `doctor_number` varchar(10) NOT NULL,
  `doctor_name` varchar(200) NOT NULL,
  `qualification` varchar(50) NOT NULL,
  `fees_per_call` decimal(10,2) NOT NULL,
  `payment_due` decimal(10,2) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phone_number` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `doc_on_call`
--

INSERT INTO `doc_on_call` (`doctor_number`, `doctor_name`, `qualification`, `fees_per_call`, `payment_due`, `address`, `phone_number`) VALUES
('DC001', 'Dr. Mark Wilson', 'MD General Medicine', '50.00', '0.00', '789 Oak St', '456-789-0123'),
('DC002', 'Dr. Emily Brown', 'MD Pediatrics', '40.00', '1.00', '987 Pine St', '789-012-3456');

--
-- Triggers `doc_on_call`
--
DELIMITER $$
CREATE TRIGGER `check_doctor_numberDC` BEFORE INSERT ON `doc_on_call` FOR EACH ROW BEGIN
  IF NEW.doctor_number NOT LIKE 'DC%' THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid doctor number';
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `check_doctor_numberDC_Update` BEFORE UPDATE ON `doc_on_call` FOR EACH ROW BEGIN
  IF NEW.doctor_number NOT LIKE 'DC%' THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid doctor number';
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `doc_reg`
--

CREATE TABLE `doc_reg` (
  `doctor_number` varchar(10) NOT NULL,
  `doctor_name` varchar(200) NOT NULL,
  `qualification` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `salary` decimal(10,2) NOT NULL,
  `date_of_joining` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `doc_reg`
--

INSERT INTO `doc_reg` (`doctor_number`, `doctor_name`, `qualification`, `address`, `phone_number`, `salary`, `date_of_joining`) VALUES
('DR001', 'Dr. John Smith', 'MD Cardiology', '123 Main St', '123-456-7890', '100000.00', '2022-01-01'),
('DR002', 'Dr. Jane Doe', 'MD Orthopedics', '456 Elm St', '987-654-3210', '100000.00', '2022-02-01');

--
-- Triggers `doc_reg`
--
DELIMITER $$
CREATE TRIGGER `check_doctor_numberDR` BEFORE INSERT ON `doc_reg` FOR EACH ROW BEGIN
  IF NEW.doctor_number NOT LIKE 'DR%' THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid doctor number';
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `check_doctor_numberDR_Update` BEFORE UPDATE ON `doc_reg` FOR EACH ROW BEGIN
  IF NEW.doctor_number NOT LIKE 'DR%' THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid doctor number';
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `operation_theater`
--

CREATE TABLE `operation_theater` (
  `operation_theater_number` varchar(10) NOT NULL,
  `operation_theater_type` varchar(20) NOT NULL,
  `status` char(1) NOT NULL,
  `charges_per_hour` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `operation_theater`
--

INSERT INTO `operation_theater` (`operation_theater_number`, `operation_theater_type`, `status`, `charges_per_hour`) VALUES
('OT001', 'general', 'Y', '100.00'),
('OT002', 'special', 'N', '150.00');

--
-- Triggers `operation_theater`
--
DELIMITER $$
CREATE TRIGGER `check_operation_theater` BEFORE INSERT ON `operation_theater` FOR EACH ROW BEGIN
  IF NEW.operation_theater_type NOT IN ('general', 'special') THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid operation theater type';
  END IF;
  IF NEW.status NOT IN ('Y', 'N') THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid status';
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `pat_admit`
--

CREATE TABLE `pat_admit` (
  `patient_number` varchar(10) NOT NULL,
  `advance_payment` decimal(10,2) NOT NULL,
  `mode_of_payment` varchar(20) NOT NULL,
  `room_number` varchar(10) NOT NULL,
  `department_name` varchar(200) NOT NULL,
  `date_of_admission` date NOT NULL,
  `initial_condition` varchar(200) NOT NULL,
  `diagnosis` varchar(200) NOT NULL,
  `treatment` varchar(200) NOT NULL,
  `doctor_number` varchar(10) NOT NULL,
  `attendant_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pat_admit`
--

INSERT INTO `pat_admit` (`patient_number`, `advance_payment`, `mode_of_payment`, `room_number`, `department_name`, `date_of_admission`, `initial_condition`, `diagnosis`, `treatment`, `doctor_number`, `attendant_name`) VALUES
('PT001', '5000.00', 'Cash', '101', 'Cardiology', '2022-01-15', 'Stable', 'Hypertensions', 'Prescribed medication', 'DR001', 'John Doe'),
('PT002', '3000.00', 'Credit Card', '201', 'Orthopedics', '2022-02-20', 'Stable', 'Fractured ankle', 'Applied cast', 'DR002', 'Jane Smith');

--
-- Triggers `pat_admit`
--
DELIMITER $$
CREATE TRIGGER `log_admission` AFTER INSERT ON `pat_admit` FOR EACH ROW BEGIN
  INSERT INTO audit_table (patient_number, doctor_number, date_admitted)
  VALUES (NEW.patient_number, NEW.doctor_number, NEW.date_of_admission);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `pat_chkup`
--

CREATE TABLE `pat_chkup` (
  `patient_number` varchar(10) NOT NULL,
  `doctor_number` varchar(10) NOT NULL,
  `date_of_checkup` date NOT NULL,
  `diagnosis` varchar(200) NOT NULL,
  `treatment` varchar(200) NOT NULL,
  `status` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pat_chkup`
--

INSERT INTO `pat_chkup` (`patient_number`, `doctor_number`, `date_of_checkup`, `diagnosis`, `treatment`, `status`) VALUES
('PT001', 'DR001', '2022-01-15', 'Hypertension', 'Prescribed medication', 'admitted'),
('PT002', 'DR002', '2022-02-20', 'Fractured ankles', 'Applied cast', 'regular');

--
-- Triggers `pat_chkup`
--
DELIMITER $$
CREATE TRIGGER `statusPatient` BEFORE INSERT ON `pat_chkup` FOR EACH ROW BEGIN
  IF NEW.status NOT IN ('admitted', 'referred for operation', 'regular') THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid doctor status';
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `statusPatientUpdate` BEFORE UPDATE ON `pat_chkup` FOR EACH ROW BEGIN
  IF NEW.status NOT IN ('admitted', 'referred for operation', 'regular') THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid doctor status';
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `pat_dis`
--

CREATE TABLE `pat_dis` (
  `patient_number` varchar(10) NOT NULL,
  `treatment_given` varchar(200) NOT NULL,
  `treatment_advice` varchar(200) NOT NULL,
  `payment_made` decimal(10,2) NOT NULL,
  `mode_of_payment` varchar(20) NOT NULL,
  `date_discharged` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pat_dis`
--

INSERT INTO `pat_dis` (`patient_number`, `treatment_given`, `treatment_advice`, `payment_made`, `mode_of_payment`, `date_discharged`) VALUES
('PT001', 'Prescribed medication', 'Follow-up visit in 3 weeks', '500.00', 'Cash', '2022-01-23'),
('PT002', 'Applied cast', 'Keep the cast for 4 weeks', '800.00', 'Credit Card', '2022-02-20');

--
-- Triggers `pat_dis`
--
DELIMITER $$
CREATE TRIGGER `log_discharge` AFTER INSERT ON `pat_dis` FOR EACH ROW BEGIN
  UPDATE audit_table SET date_discharged = NEW.date_discharged
  WHERE patient_number = NEW.patient_number;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `log_discharge_update` AFTER UPDATE ON `pat_dis` FOR EACH ROW BEGIN
  UPDATE audit_table SET date_discharged = NEW.date_discharged
  WHERE patient_number = NEW.patient_number;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `pat_entry`
--

CREATE TABLE `pat_entry` (
  `patient_number` varchar(10) NOT NULL,
  `patient_name` varchar(200) NOT NULL,
  `age` int NOT NULL,
  `sex` char(1) NOT NULL,
  `address` varchar(100) NOT NULL,
  `city` varchar(50) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `entry_date` date NOT NULL,
  `doctor_name` varchar(200) NOT NULL,
  `diagnosis` varchar(200) NOT NULL,
  `department_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pat_entry`
--

INSERT INTO `pat_entry` (`patient_number`, `patient_name`, `age`, `sex`, `address`, `city`, `phone_number`, `entry_date`, `doctor_name`, `diagnosis`, `department_name`) VALUES
('PT001', 'John Doe', 31, 'M', '789 Main St', 'New York', '123-456-7890', '2022-01-15', 'Dr. John Smith', 'Hypertension', 'Cardiology'),
('PT002', 'Jane Smith', 45, 'F', '456 Elm St', 'Los Angeles', '987-654-3210', '2022-02-20', 'Dr. Jane Doe', 'Fractured ankle', 'Orthopedics');

--
-- Triggers `pat_entry`
--
DELIMITER $$
CREATE TRIGGER `check_patient_number` BEFORE INSERT ON `pat_entry` FOR EACH ROW BEGIN
  IF NEW.patient_number NOT LIKE 'PT%' THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid patient number';
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `pat_opr`
--

CREATE TABLE `pat_opr` (
  `patient_number` varchar(10) NOT NULL,
  `date_of_admission` date NOT NULL,
  `date_of_operation` date NOT NULL,
  `doctor_number` varchar(10) NOT NULL,
  `operation_theater_number` varchar(10) NOT NULL,
  `type_of_operation` varchar(50) NOT NULL,
  `condition_before_operation` varchar(200) NOT NULL,
  `condition_after_operation` varchar(200) NOT NULL,
  `treatment_advice` varchar(200) NOT NULL,
  `department_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pat_opr`
--

INSERT INTO `pat_opr` (`patient_number`, `date_of_admission`, `date_of_operation`, `doctor_number`, `operation_theater_number`, `type_of_operation`, `condition_before_operation`, `condition_after_operation`, `treatment_advice`, `department_name`) VALUES
('PT001', '2022-04-15', '2022-04-20', 'DR001', 'OT001', 'Knees Replacement', 'Degenerative joint disease', 'Improved mobility and reduced pain', 'Physical therapy and rehabilitation', 'Orthopedics');

-- --------------------------------------------------------

--
-- Table structure for table `pat_reg`
--

CREATE TABLE `pat_reg` (
  `patient_number` varchar(10) NOT NULL,
  `date_of_visit` date NOT NULL,
  `diagnosis` varchar(200) NOT NULL,
  `treatment` varchar(200) NOT NULL,
  `medicine_recommended` varchar(200) NOT NULL,
  `status_of_treatment` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pat_reg`
--

INSERT INTO `pat_reg` (`patient_number`, `date_of_visit`, `diagnosis`, `treatment`, `medicine_recommended`, `status_of_treatment`) VALUES
('PT001', '2022-01-15', 'Hypertension', 'Prescribed medication', 'Lisinopril', 'ongoing'),
('PT002', '2022-02-20', 'Fractured ankle', 'Applied cast', 'Ibuprofen', 'completed');

-- --------------------------------------------------------

--
-- Table structure for table `room_details`
--

CREATE TABLE `room_details` (
  `room_number` varchar(10) NOT NULL,
  `room_type` char(1) NOT NULL,
  `status` char(1) NOT NULL,
  `patient_number` varchar(10) DEFAULT NULL,
  `patient_name` varchar(200) DEFAULT NULL,
  `charges_per_day` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `room_details`
--

INSERT INTO `room_details` (`room_number`, `room_type`, `status`, `patient_number`, `patient_name`, `charges_per_day`) VALUES
('101', 'G', 'Y', 'PT001', 'John Doe', '200.00'),
('201', 'P', 'N', NULL, NULL, '300.00');

--
-- Triggers `room_details`
--
DELIMITER $$
CREATE TRIGGER `check_room_details` BEFORE INSERT ON `room_details` FOR EACH ROW BEGIN
  IF NEW.room_type NOT IN ('G', 'P') THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid room type';
  END IF;
  IF NEW.status NOT IN ('Y', 'N') THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid status';
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `check_room_details_Update` BEFORE UPDATE ON `room_details` FOR EACH ROW BEGIN
  IF NEW.room_type NOT IN ('G', 'P') THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid room type';
  END IF;
  IF NEW.status NOT IN ('Y', 'N') THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid status';
  END IF;
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `all_doctors`
--
ALTER TABLE `all_doctors`
  ADD PRIMARY KEY (`identity_number`),
  ADD KEY `department_name` (`department_name`),
  ADD KEY `doctor_name` (`doctor_name`);

--
-- Indexes for table `audit_table`
--
ALTER TABLE `audit_table`
  ADD PRIMARY KEY (`patient_number`,`doctor_number`,`date_admitted`),
  ADD KEY `doctor_number` (`doctor_number`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`department_name`);

--
-- Indexes for table `doc_on_call`
--
ALTER TABLE `doc_on_call`
  ADD PRIMARY KEY (`doctor_number`),
  ADD KEY `doctor_name` (`doctor_name`);

--
-- Indexes for table `doc_reg`
--
ALTER TABLE `doc_reg`
  ADD PRIMARY KEY (`doctor_number`),
  ADD KEY `doctor_name` (`doctor_name`);

--
-- Indexes for table `operation_theater`
--
ALTER TABLE `operation_theater`
  ADD PRIMARY KEY (`operation_theater_number`);

--
-- Indexes for table `pat_admit`
--
ALTER TABLE `pat_admit`
  ADD PRIMARY KEY (`patient_number`),
  ADD KEY `department_name` (`department_name`),
  ADD KEY `room_number` (`room_number`),
  ADD KEY `doctor_number` (`doctor_number`);

--
-- Indexes for table `pat_chkup`
--
ALTER TABLE `pat_chkup`
  ADD PRIMARY KEY (`patient_number`),
  ADD KEY `doctor_number` (`doctor_number`);

--
-- Indexes for table `pat_dis`
--
ALTER TABLE `pat_dis`
  ADD PRIMARY KEY (`patient_number`);

--
-- Indexes for table `pat_entry`
--
ALTER TABLE `pat_entry`
  ADD PRIMARY KEY (`patient_number`),
  ADD KEY `doctor_name` (`doctor_name`),
  ADD KEY `department_name` (`department_name`);

--
-- Indexes for table `pat_opr`
--
ALTER TABLE `pat_opr`
  ADD PRIMARY KEY (`patient_number`),
  ADD KEY `doctor_number` (`doctor_number`),
  ADD KEY `operation_theater_number` (`operation_theater_number`),
  ADD KEY `department_name` (`department_name`);

--
-- Indexes for table `pat_reg`
--
ALTER TABLE `pat_reg`
  ADD PRIMARY KEY (`patient_number`,`date_of_visit`);

--
-- Indexes for table `room_details`
--
ALTER TABLE `room_details`
  ADD PRIMARY KEY (`room_number`),
  ADD KEY `patient_number` (`patient_number`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `all_doctors`
--
ALTER TABLE `all_doctors`
  ADD CONSTRAINT `all_doctors_ibfk_1` FOREIGN KEY (`department_name`) REFERENCES `department` (`department_name`);

--
-- Constraints for table `audit_table`
--
ALTER TABLE `audit_table`
  ADD CONSTRAINT `audit_table_ibfk_1` FOREIGN KEY (`patient_number`) REFERENCES `pat_entry` (`patient_number`),
  ADD CONSTRAINT `audit_table_ibfk_2` FOREIGN KEY (`doctor_number`) REFERENCES `all_doctors` (`identity_number`);

--
-- Constraints for table `doc_on_call`
--
ALTER TABLE `doc_on_call`
  ADD CONSTRAINT `doc_on_call_ibfk_1` FOREIGN KEY (`doctor_number`) REFERENCES `all_doctors` (`identity_number`),
  ADD CONSTRAINT `doc_on_call_ibfk_2` FOREIGN KEY (`doctor_name`) REFERENCES `all_doctors` (`doctor_name`);

--
-- Constraints for table `doc_reg`
--
ALTER TABLE `doc_reg`
  ADD CONSTRAINT `doc_reg_ibfk_1` FOREIGN KEY (`doctor_number`) REFERENCES `all_doctors` (`identity_number`),
  ADD CONSTRAINT `doc_reg_ibfk_2` FOREIGN KEY (`doctor_name`) REFERENCES `all_doctors` (`doctor_name`);

--
-- Constraints for table `pat_admit`
--
ALTER TABLE `pat_admit`
  ADD CONSTRAINT `pat_admit_ibfk_1` FOREIGN KEY (`patient_number`) REFERENCES `pat_entry` (`patient_number`),
  ADD CONSTRAINT `pat_admit_ibfk_2` FOREIGN KEY (`department_name`) REFERENCES `department` (`department_name`),
  ADD CONSTRAINT `pat_admit_ibfk_3` FOREIGN KEY (`room_number`) REFERENCES `room_details` (`room_number`),
  ADD CONSTRAINT `pat_admit_ibfk_4` FOREIGN KEY (`doctor_number`) REFERENCES `all_doctors` (`identity_number`);

--
-- Constraints for table `pat_chkup`
--
ALTER TABLE `pat_chkup`
  ADD CONSTRAINT `pat_chkup_ibfk_1` FOREIGN KEY (`patient_number`) REFERENCES `pat_entry` (`patient_number`),
  ADD CONSTRAINT `pat_chkup_ibfk_2` FOREIGN KEY (`doctor_number`) REFERENCES `all_doctors` (`identity_number`);

--
-- Constraints for table `pat_dis`
--
ALTER TABLE `pat_dis`
  ADD CONSTRAINT `pat_dis_ibfk_1` FOREIGN KEY (`patient_number`) REFERENCES `pat_entry` (`patient_number`);

--
-- Constraints for table `pat_entry`
--
ALTER TABLE `pat_entry`
  ADD CONSTRAINT `pat_entry_ibfk_1` FOREIGN KEY (`doctor_name`) REFERENCES `all_doctors` (`doctor_name`),
  ADD CONSTRAINT `pat_entry_ibfk_2` FOREIGN KEY (`department_name`) REFERENCES `department` (`department_name`);

--
-- Constraints for table `pat_opr`
--
ALTER TABLE `pat_opr`
  ADD CONSTRAINT `pat_opr_ibfk_1` FOREIGN KEY (`patient_number`) REFERENCES `pat_entry` (`patient_number`),
  ADD CONSTRAINT `pat_opr_ibfk_2` FOREIGN KEY (`doctor_number`) REFERENCES `all_doctors` (`identity_number`),
  ADD CONSTRAINT `pat_opr_ibfk_3` FOREIGN KEY (`operation_theater_number`) REFERENCES `operation_theater` (`operation_theater_number`),
  ADD CONSTRAINT `pat_opr_ibfk_4` FOREIGN KEY (`department_name`) REFERENCES `department` (`department_name`);

--
-- Constraints for table `pat_reg`
--
ALTER TABLE `pat_reg`
  ADD CONSTRAINT `pat_reg_ibfk_1` FOREIGN KEY (`patient_number`) REFERENCES `pat_entry` (`patient_number`);

--
-- Constraints for table `room_details`
--
ALTER TABLE `room_details`
  ADD CONSTRAINT `room_details_ibfk_1` FOREIGN KEY (`patient_number`) REFERENCES `pat_entry` (`patient_number`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
