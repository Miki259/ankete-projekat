-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: ankete_app
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `anketa`
--

DROP TABLE IF EXISTS `anketa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anketa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `korisnik_id` int NOT NULL,
  `naziv` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `opis` text COLLATE utf8mb4_unicode_ci,
  `kod` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `datum_kreiranja` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `kod` (`kod`),
  KEY `korisnik_id` (`korisnik_id`),
  CONSTRAINT `anketa_ibfk_1` FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anketa`
--

LOCK TABLES `anketa` WRITE;
/*!40000 ALTER TABLE `anketa` DISABLE KEYS */;
INSERT INTO `anketa` VALUES (5,1,'Zadovoljstvo fakultetom','Anketa za prikupljanje mišljenja studenata o nastavi i organizaciji fakulteta.','1egit7tvwi','2026-06-09 12:12:27'),(6,1,'Anketa za Restoran Topčider','Anketa za procenu kvaliteta usluge i hrane u restoranu.','oehw7t4wyg','2026-06-09 12:18:17'),(8,1,'Koriscenje drustvenih mreza','Anketa o navikama koriscenja drustvenih mreza medju korisnicima razlicitih uzrasta.','a9n7v72w0q','2026-06-09 12:51:17');
/*!40000 ALTER TABLE `anketa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `korisnik`
--

DROP TABLE IF EXISTS `korisnik`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `korisnik` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ime` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lozinka` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `korisnik`
--

LOCK TABLES `korisnik` WRITE;
/*!40000 ALTER TABLE `korisnik` DISABLE KEYS */;
INSERT INTO `korisnik` VALUES (1,'Admin','admin@gmail.com','admin123');
/*!40000 ALTER TABLE `korisnik` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `odgovor`
--

DROP TABLE IF EXISTS `odgovor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `odgovor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `popunjavanje_id` int NOT NULL,
  `pitanje_id` int NOT NULL,
  `vrednost` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `popunjavanje_id` (`popunjavanje_id`),
  KEY `pitanje_id` (`pitanje_id`),
  CONSTRAINT `odgovor_ibfk_1` FOREIGN KEY (`popunjavanje_id`) REFERENCES `popunjavanje` (`id`) ON DELETE CASCADE,
  CONSTRAINT `odgovor_ibfk_2` FOREIGN KEY (`pitanje_id`) REFERENCES `pitanje` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `odgovor`
--

LOCK TABLES `odgovor` WRITE;
/*!40000 ALTER TABLE `odgovor` DISABLE KEYS */;
INSERT INTO `odgovor` VALUES (8,8,6,'Milan Neskovic'),(9,8,7,'4'),(10,8,8,'Da'),(11,8,9,'10'),(12,8,10,'Trenutno ne bih nista unapredio, sve mi se svidja.'),(13,9,11,'Prijatelji'),(14,9,12,'Da'),(15,9,13,'10'),(16,9,14,'Gurmanska pljeskavica'),(17,9,15,'Potpuno se slažem'),(18,9,16,'Nemam.'),(29,12,22,'Instagram'),(30,12,23,'Da'),(31,12,24,'1-3h'),(32,12,25,'4'),(33,12,26,'Slažem se');
/*!40000 ALTER TABLE `odgovor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pitanje`
--

DROP TABLE IF EXISTS `pitanje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pitanje` (
  `id` int NOT NULL AUTO_INCREMENT,
  `anketa_id` int NOT NULL,
  `tekst` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `tip` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `opcije` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `anketa_id` (`anketa_id`),
  CONSTRAINT `pitanje_ibfk_1` FOREIGN KEY (`anketa_id`) REFERENCES `anketa` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pitanje`
--

LOCK TABLES `pitanje` WRITE;
/*!40000 ALTER TABLE `pitanje` DISABLE KEYS */;
INSERT INTO `pitanje` VALUES (6,5,'Kako se zovete?','kratak_tekst',''),(7,5,'Koja ste godina studija?','lista','1,2,3,4'),(8,5,'Da li ste zadovoljni nastavom? ','da_ne',''),(9,5,'Ocenite fakultet','ocena',''),(10,5,'Šta biste unapredili?','dug_tekst',''),(11,6,'Kako ste saznali za restoran?','lista','Internet,Prijatelji,Društvene mreže,Prolazio sam pored,Drugo'),(12,6,'Da li ste zadovoljni uslugom?','da_ne',''),(13,6,'Kako ocenjujete kvalitet hrane?','ocena',''),(14,6,'Koje jelo vam je bilo omiljeno?','kratak_tekst',''),(15,6,'Koliko se slažete sa tvrdnjom: \"Restoran bih preporučio prijateljima\"','slaganje',''),(16,6,'Dodatni komentar ili predlog','dug_tekst',''),(22,8,'Koju drustvenu mrezu najvise koristite?','lista','Instagram,TikTok,Facebook,X,YouTube'),(23,8,'Da li svakodnevno koristite drustvene mreze?','da_ne',''),(24,8,'Koliko sati dnevno provedete na drustvenim mrezama?','lista','Manje od 1h,1-3h,3-5h,Vise od 5h'),(25,8,'Ocenite uticaj drustvenih mreza na svakodnevni zivot','ocena',''),(26,8,'Koliko se slazete sa tvrdnjom \"Drustvene mreze olaksavaju komunikaciju\"?','slaganje','');
/*!40000 ALTER TABLE `pitanje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `popunjavanje`
--

DROP TABLE IF EXISTS `popunjavanje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `popunjavanje` (
  `id` int NOT NULL AUTO_INCREMENT,
  `anketa_id` int NOT NULL,
  `datum` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `anketa_id` (`anketa_id`),
  CONSTRAINT `popunjavanje_ibfk_1` FOREIGN KEY (`anketa_id`) REFERENCES `anketa` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `popunjavanje`
--

LOCK TABLES `popunjavanje` WRITE;
/*!40000 ALTER TABLE `popunjavanje` DISABLE KEYS */;
INSERT INTO `popunjavanje` VALUES (8,5,'2026-06-09 12:16:05'),(9,6,'2026-06-09 12:20:55'),(12,8,'2026-06-09 12:53:17');
/*!40000 ALTER TABLE `popunjavanje` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-09 12:56:49
