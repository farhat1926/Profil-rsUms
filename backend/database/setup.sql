-- Membuat Database jika belum ada
CREATE DATABASE IF NOT EXISTS `profile_rs`;
USE `profile_rs`;

-- 1. Tabel Admin
CREATE TABLE IF NOT EXISTS `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default admin (Jika belum ada)
INSERT INTO `admins` (`username`, `password`) 
SELECT 'admin', 'admin123' 
WHERE NOT EXISTS (SELECT * FROM `admins` WHERE `username` = 'admin');

-- 2. Tabel Dokter
CREATE TABLE IF NOT EXISTS `dokter` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama_dokter` varchar(255) NOT NULL,
  `spesialis` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `spesialis_id` int DEFAULT NULL,
  `deskripsi` TEXT DEFAULT NULL, 
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Tabel Jadwal Dokter (Bereselasi dengan tabel dokter)
CREATE TABLE IF NOT EXISTS `jadwal_dokter` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dokter_id` int NOT NULL,
  `hari` varchar(20) NOT NULL,
  `jam` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`dokter_id`) REFERENCES `dokter`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Tabel Event / Kegiatan
CREATE TABLE IF NOT EXISTS `event_kegiatan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `short_desc` text,
  `full_desc` longtext,
  `image` varchar(255) DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Tabel Informasi / Artikel
CREATE TABLE IF NOT EXISTS `informasi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `summary` text,
  `content` longtext,
  `author` varchar(100) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Tabel Promo
CREATE TABLE IF NOT EXISTS `promo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `detail_description` longtext,
  `link` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;