-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 21, 2023 at 03:07 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `clinica_resilia`
--

-- --------------------------------------------------------

--
-- Table structure for table `consulta`
--

CREATE TABLE `consulta` (
  `id` int(11) NOT NULL,
  `data` varchar(20) DEFAULT NULL,
  `horario` varchar(5) DEFAULT NULL,
  `cliente` varchar(50) DEFAULT NULL,
  `clientesobre` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `sintomas` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consulta`
--

INSERT INTO `consulta` (`id`, `data`, `horario`, `cliente`, `clientesobre`, `email`, `sintomas`) VALUES
(4, 'Terça-feira', '16:00', 'ssss', 'ssss', '', 'nao');

-- --------------------------------------------------------

--
-- Table structure for table `medicamentos`
--

CREATE TABLE `medicamentos` (
  `id` int(15) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `dosagem` varchar(40) NOT NULL,
  `composicao` varchar(30) NOT NULL,
  `comprimidos` varchar(30) NOT NULL,
  `preco` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medicamentos`
--

INSERT INTO `medicamentos` (`id`, `nome`, `dosagem`, `composicao`, `comprimidos`, `preco`) VALUES
(1, 'Concerta', '36mg', 'mg', '30', 'R$ 274,65'),
(2, 'Cloridrato de Fluoxetina ', '20 mg', 'mg', '30', 'R$16,54'),
(3, 'Frontal Alprazolam', '0,5 mg', 'Mg', '30', 'R$ 53,01'),
(4, 'Histadin D Loratadina', '5 mg/120mg', 'mg', '12', 'R$43,80'),
(5, 'Dorflex', '300mg + 35mg + 50mg', 'mg', '36', 'R$ 17,68'),
(6, 'Metilfenidato (Ritalina)', '10mg', 'mg', '60', 'R$88,69'),
(7, 'Ibuprofeno', '400 mg', 'Mg', '10', 'R$ 21,99'),
(8, 'Propranolol ', '40 mg', 'mg', '60', 'R$ 20,00');

-- --------------------------------------------------------

--
-- Table structure for table `medico`
--

CREATE TABLE `medico` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `nascimento` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefone` varchar(100) NOT NULL,
  `cpf` int(11) NOT NULL,
  `senha` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medico`
--

INSERT INTO `medico` (`id`, `nome`, `nascimento`, `email`, `telefone`, `cpf`, `senha`) VALUES
(20, 'bruno pereira de carvalho pinto', '', 'brunocarvpinto@gmail.com', '(21) 9814-64062', 2147483647, ''),
(21, 'bruno', '', 'bruno@', '21', 1, ''),
(22, 'teste', '', 'teste', 'teste', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `paciente`
--

CREATE TABLE `paciente` (
  `id` int(11) NOT NULL,
  `nome` varchar(30) DEFAULT NULL,
  `nascimento` varchar(10) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `telefone` varchar(15) DEFAULT NULL,
  `cpf` varchar(15) DEFAULT NULL,
  `senha` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `paciente`
--

INSERT INTO `paciente` (`id`, `nome`, `nascimento`, `email`, `telefone`, `cpf`, `senha`) VALUES
(2, 'joao', '07/01/2001', 'joao@', '9876543', '2', '1'),
(3, 'bruno', '23', 'teste', '76543', '10', '10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `consulta`
--
ALTER TABLE `consulta`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medicamentos`
--
ALTER TABLE `medicamentos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medico`
--
ALTER TABLE `medico`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `consulta`
--
ALTER TABLE `consulta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `medicamentos`
--
ALTER TABLE `medicamentos`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `medico`
--
ALTER TABLE `medico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
