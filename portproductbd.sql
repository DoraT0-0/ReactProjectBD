-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sportproductdb
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

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
-- Table structure for table `carts`
--
USE sportproductdb;

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `count` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ClientId` int(11) DEFAULT NULL,
  `ProductId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ClientId` (`ClientId`),
  KEY `ProductId` (`ProductId`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`ClientId`) REFERENCES `clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`ProductId`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categorias` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Тренажёры','2024-04-23 12:14:08','2024-04-23 12:14:08'),(2,'Атлетика','2024-04-23 12:15:37','2024-04-23 12:15:37'),(3,'Фитнес','2024-04-24 15:44:19','2024-04-24 15:44:19'),(4,'Единоборства','2024-05-02 16:53:03','2024-05-02 16:53:03'),(5,'Функциональный тренинг','2024-05-02 16:53:31','2024-05-02 16:53:31'),(6,'Массажное оборудование','2024-05-02 16:53:53','2024-05-02 16:53:53'),(7,'Теннисные столы','2024-05-02 16:54:19','2024-05-02 16:54:19');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `adress` varchar(255) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'admin@admin.com','$2b$10$slJWzsXzjqkHRW68IvXaaOAaW/cxx8aCNIdLXZRH/oA/qTcIQPFsO','+71231231231',NULL,1,'2024-05-01 10:07:57','2024-05-01 10:07:57'),(2,'admin2@admin2.com','$2b$10$ewBF30Vw4IeSaFhm7ir3VuDucEDS8WQr4/SmjiLMJ06oKWvsfrqN2','+7888888888',NULL,0,'2024-05-01 10:09:52','2024-05-01 10:09:52');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `description` text DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CategoriaId` int(11) DEFAULT NULL,
  `ProviderId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `CategoriaId` (`CategoriaId`),
  KEY `ProviderId` (`ProviderId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`CategoriaId`) REFERENCES `categorias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`ProviderId`) REFERENCES `providers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (4,'Беговая дорожка Family TM 136',23990,'Компактная модель беговой дорожки Family TM 136 для легких домашних тренировок. Утренний моцион или легкая оздоровительная пробежка состоятся в любую непогоду, если дома электрическая дорожка Family. Надежный двигатель обеспечивает стабильную работу и плавное переключением скоростного режима в диапазоне 0.6-8 км/ч.',5,'https://sportaim-shop.ru/image/cache/data/Trenageri!!/Family/Beg/Беговая%20дорожка%20Family%20TM%20136%200-450x450.png','2024-05-02 16:56:01','2024-05-02 16:56:01',1,1),(5,'Беговая дорожка CardioPower TT',27990,'Ультракомпактная дорожка CardioPower TT по-настоящему уникальна, благодаря комбинации компактных размеров и функционала полноценной беговой дорожки. Эта модель впишется в любые ограничения, т.к верхкомпактные размеры позволяют её хранить как горизонтально под кроватью, так и вертикально за шкафом. Встроенные колеса облегчают транспортировку тренажера.',17,'https://sportaim-shop.ru/image/cache/data/Cardio%20Power/2023/Beg/tt02-450x450.png','2024-05-02 16:57:50','2024-05-02 16:57:50',1,1),(6,'Беговая дорожка Evo Fitness Integra II',36000,'Беговая дорожка EVO FITNESS Integra II- современная беговая дорожка, которая отлично подойдёт для начинающих пользователей.',6,'https://sportaim-shop.ru/image/cache/data/Evo%20Fitness/Integra2-450x450.jpg','2024-05-02 16:58:39','2024-05-02 16:58:39',1,2),(7,'Паралетсы Plastep',1840,'Низкие брусья паралетсы для домашних и уличных тренировок.\n\nЛёгкие, прочные, компактные, удобные. Относительно небольшая высота от пола, делают их наиболее устойчивыми при выполнении упражнений, в том числе и в динамике. Универсальность - подходят для упражнений на разные группы мышц (грудные, бицепсы, трицепсы, мышцы спины и пресса).Компактность - низкие напольные брусья для домашних тренировок.',23,'https://sportaim-shop.ru/image/cache/data/Plastep/2021/paral%20plastep-450x450.jpg','2024-05-02 17:00:24','2024-05-02 17:00:24',1,2),(8,'Скамья для пресса прямая Oxygen Fitness RENTON',5990,'Прямая скамья для пресса от немецкого производителя OXYGEN FITNESS – это идеальное дополнение для домашнего спортзала. Оборудование предназначено для всесторонней проработки мышц пресса, а также для различных типов упражнений – приседания, жим лежа, подъем ног и т.д.',12,'https://sportaim-shop.ru/image/cache/data/Oxygen%20Fitness/renton%20скамья-450x450.png','2024-05-02 17:01:10','2024-05-02 17:01:10',1,1),(9,'Стойка под штангу Hasttings HastStrong',7990,'Стойка под штангу HastStrong предназначена для выполнения разнообразных упражнений: жим штанги сидя/ лежа. Эти упражнения помогают развивать дельтовидные мышцы, трехглавые мышцы плеча, а также мышцы груди. Благодаря регулировке в положениях, стойку можно использовать как арку для приседов.',10,'https://sportaim-shop.ru/image/cache/data/Hasttings/skami,stoiki/%20под%20штангу%20HastStrong-450x450.gif','2024-05-02 17:02:18','2024-05-02 17:02:18',1,2),(10,'Турник раздвижной Plastep',1500,'Турник раздвижной от 65 до 155 см.',32,'https://sportaim-shop.ru/image/cache/data/Atletika/Plastep/turnik_razdvijnoi-450x450.jpg','2024-05-02 17:03:54','2024-05-02 17:03:54',2,2),(11,'Диски обрезиненные ZSO \"3 HANDLE\" D=26 0,5-25 кг, цветные',205,'Диски обрезиненные ZSO цветные \"3 HANDLE\" D-26, 0,5 кг. имеют удобные ручки для переноса дисков. \n\nДоступные веса в линейке ZSO цветные \"3 HANDLE\" D-26: от 0,5 до 25 кг. При термообработке (обрезинивании) для надежного сцепления резины и металла используется термоклей.',13,'https://sportaim-shop.ru/image/cache/data/ZSO/metall/_zso_3_handle_d-26_0_5_-450x450.jpg','2024-05-02 18:14:10','2024-05-02 18:14:10',2,2),(12,'Лямки для тяги Sprinter',220,'Лямки для тяги Sprinter- один из аксессуаров, применяемых во всех силовых видах спорта. Такой аксессуар отлично подходит для спортсменов занимающихся силовыми видами спорта. Аксессуар препятствует выпадению спортивного снаряда из рук, уменьшая риск получения травм.',65,'https://sportaim-shop.ru/image/cache/data/Sprinter/22/03358%200-450x450.png','2024-05-02 18:14:47','2024-05-02 18:14:47',2,2),(13,'Бодибары Plastep 1-14 кг.',1280,'Бодибар – это интересное изобретение, которое выполняет функции аналогичные гантелям, однако более удобные в процессе эксплуатации за счет резиновой поверхности. Бодибар является по функциональности и физическим параметрам переходным вариантом между гантелями и штангой.',23,'https://sportaim-shop.ru/image/cache/data/Atletika/Plastep/body-bar-450x450.jpg','2024-05-02 18:15:27','2024-05-02 18:15:27',3,1),(14,'Стойка для бодибаров DHZ 5406',25380,'Подставка под бодибары ZSO Profi-Fit Rus 5406 - подставка вертикального хранения. Удобная небольшая и вместительная подставка позволяет разместить необходимое количество бодибаров и обеспечивает комфортный доступ к ним в случае необходимости. Выполнена из стальной профильной трубы, толщина стенки 2 мм. Пластиковые заглушки на ножках.',23,'https://sportaim-shop.ru/image/cache/data/Atletika/ZSO/_profi-fit_zso_rus_5406-450x450.jpg','2024-05-02 18:15:55','2024-05-02 18:15:55',3,2),(15,'Гантель неопреновая Espado ES1115',300,'Гантель – незаменимый снаряд для тренировки мышечного каркаса человека. Используется в фитнесе, бодибилдинге, функциональном тренинге (в том числе CrossFit), лечебной физкультуре, беге и других спортивных дисциплинах. ',23,'https://sportaim-shop.ru/image/cache/data/ESPADO/ES1115%201-450x450.png','2024-05-02 18:16:53','2024-05-02 18:16:53',3,1),(16,'Гантель неразборная, хромированная ProfiGym, 1-30 кг.',1330,'Гантели для занятия спортом со специальным комплексным составом никеля и хрома. Никель предохраняет от коррозии, а хром придает блеск и защищает поверхность гантели от вмятин и царапин.',23,'https://sportaim-shop.ru/image/cache/data/1/profi%20gym/(0)-450x450.png','2024-05-02 18:21:43','2024-05-02 18:21:43',3,2),(17,'Накладки каратэ Эластик Green Hill',490,'Накладки на руки для карате.',23,'https://sportaim-shop.ru/image/cache/data/Edinoborstva/zashita/Green%20Hill/%20%20Каратэ%20Эластик%20Green%20Hill%20HP-6133(1)-450x450.jpeg','2024-05-02 18:26:19','2024-05-02 18:26:19',4,1),(18,'Накладки для каратэ BoyBo Nylex',1190,'Накладки BoyBo- отличная защита для тренировок и соревнований из высогоэластичного материала NYLEX анатомической формы, позволяя кулаку при сжатии находиться в естественном положении.\n\nУдарная поверхность содержит усиленный амортизирующий слой для однородного поглащения удара. Надёжная системя крепления.',12,'https://sportaim-shop.ru/image/cache/data/BoyBo/nakladki/Накладки%20для%20каратэ%20BoyBo%20Nylex%200-450x450.jpg','2024-05-02 18:27:12','2024-05-02 18:27:12',4,2),(19,'Канат для перетягивания D=30 мм ULTIMATE Sport',230,'Канат для перетягивания.',43,'https://sportaim-shop.ru/image/cache/data/Crossfit/Snariad/QRwfMS2yRjw-450x450.jpg','2024-05-02 18:28:14','2024-05-02 18:28:14',5,2),(20,'Пояс тяги ULTIMATE Sport BELT 2',800,'Пояс тяги BELT 2 ULTIMATE Sport необходим для тренировки динамических движения с дополнительным отягощением. Пояс универсален, его можно использовать с груз-санями, колесами, мешками, эспандерами.Застежка позволяет быстро снимать пояс, для продолжения движения без нагрузки.Легкая и весьма крепкая стропа переходник изготовлена из синтетических нитей специального плетения. Тяга переносится на сам пояс, не влияя на крепление пояса.',23,'https://sportaim-shop.ru/image/cache/data/Barier/da1020170(3)-450x450.jpg','2024-05-02 18:31:12','2024-05-02 18:31:12',5,2),(21,'Массажёр овальный Sprinter 10033',100,'Массажёр овальный на 4-х ножках устраняет мышечные боли, а также используется в посттравматический период. Применяется для стимулирования кровообращения, восстановления тонуса мышц при малоподвижном образе жизни, способствует быстрому расслаблению мышц после физических нагрузок, снимает усталость, стресс.',54,'https://sportaim-shop.ru/image/cache/data/Sprinter/10033-450x450.png','2024-05-02 18:32:16','2024-05-02 18:32:16',6,2),(22,'Массажёр-каталка из 13 массажных роликов Sprinter',450,'Массажёр-каталка состоит из 13-ти массажных роликов на палке. Применяется для самомассажа, снимает напряжение в мышцах.',33,'https://sportaim-shop.ru/image/cache/data/Sprinter/Massag/31672%200-450x450.png','2024-05-02 18:33:01','2024-05-02 18:33:01',6,1),(23,'Теннисный стол тренировочный Start Line Leader 22 мм., цвет зелёный',32990,'Теннисный стол тренировочный Start Line Leader- клубный стол для настольного тенниса, который подходит для игры в помещении, идеален для тренировок и соревнований. Стол для настольного тенниса с усиленной рамой, двойными раскосами, идеально фиксирующими стол во время игры и тренировок. Толщина столешницы обеспечивает отличный отскок мяча, что позволяет использовать стол для тренировочных занятий в спортивных клубах. Благодаря единой раме стол просто складывается и легко транспортируется.',3,'https://sportaim-shop.ru/image/cache/data/Star%20Line/Stol/Теннисный%20стол%20Leader%20green%20%200-450x450.png','2024-05-02 18:33:44','2024-05-02 18:33:44',7,1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `providers`
--

DROP TABLE IF EXISTS `providers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `providers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `adress` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `providers`
--

LOCK TABLES `providers` WRITE;
/*!40000 ALTER TABLE `providers` DISABLE KEYS */;
INSERT INTO `providers` VALUES (1,'Магазин Северный','344068, Россия, г. Ростов-на-Дону, ул.Евдокимова, 39Б','+7(7989)405-57-46','nanussebrufroi-4724@yopmail.com','2024-04-26 15:49:33','2024-04-26 15:49:33'),(2,'Магазин Западный','344090, Россия, обл Ростовская, г Ростов-на-Дону, ул Доватора, дом 207/6','7(8620)076-86-42','pruwussujenou-9005@yopmail.com','2024-04-26 15:50:17','2024-04-26 15:50:17');
/*!40000 ALTER TABLE `providers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-02 21:36:19
