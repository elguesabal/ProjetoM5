-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 01-Mar-2023 às 20:39
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `clinica_resilia`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `consulta`
--

CREATE TABLE `consulta` (
  `id` int(11) NOT NULL,
  `data` varchar(20) DEFAULT NULL,
  `horario` varchar(5) DEFAULT NULL,
  `cliente` varchar(50) DEFAULT NULL,
  `clientesobre` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `sintomas` varchar(300) DEFAULT NULL,
  `consultacpf_cliente` varchar(15) NOT NULL,
  `id_medico` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `consulta`
--

INSERT INTO `consulta` (`id`, `data`, `horario`, `cliente`, `clientesobre`, `email`, `sintomas`, `consultacpf_cliente`) VALUES
(4, 'Terça-feira', '16:00', 'ssss', 'ssss', '', 'nao', '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `exames`
--


CREATE TABLE `exames` (
  `id` int(11) NOT NULL,
  `exame` varchar(100) DEFAULT NULL,
  `medico` varchar(100) DEFAULT NULL,
  `cpf_medico` varchar(15) NOT NULL,
  `paciente` varchar(100) DEFAULT NULL,
  `cpf_cliente` varchar(15) NOT NULL,
  `data` varchar(50) DEFAULT NULL,
  `horario` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `exames`
--

INSERT INTO `exames` (`id`, `exame`, `medico`, `cpf_medico`, `paciente`, `cpf_cliente`, `data`, `horario`) VALUES
(9, 'Hemograma', 'Dr. Lampião', '', 'Maria Bonita', '111.111.111-11', 'Terça-feira', '11:00:00'),
(10, 'Hemograma', 'Dra. Maria Bonita', '', 'Lampião', '', '2023-03-02', '16:00:00'),
(11, 'Ácido Úrico', 'Patati', '', 'Patatá', '', 'Quarta-feira', '13:00:00'),
(12, 'Hemograma', 'bruno', '', 'Maria Bonita', '111.111.111-11', 'Terça-feira', '13:00:00'),
(13, 'Hemograma', 'Maria', '', 'bruno', '', '2023-03-01', '21:00:00'),
(14, 'Hemograma', 'Maria', '', 'bruno', '', '2023-03-02', '10:00:00');


-- --------------------------------------------------------

--
-- Estrutura da tabela `medicamentos`
--

CREATE TABLE `medicamentos` (
  `id` int(15) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `dosagem` varchar(40) NOT NULL,
  `composicao` varchar(30) NOT NULL,
  `comprimidos` varchar(30) NOT NULL,
  `preco` varchar(30) NOT NULL,
  `urlmed` mediumblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `medicamentos`
--

INSERT INTO `medicamentos` (`id`, `nome`, `dosagem`, `composicao`, `comprimidos`, `preco`, `urlmed`) VALUES
(1, 'Concerta', '36mg', 'MG', '30 comprimidos', 'R$ 274,64', 0x68747470733a2f2f63646e2d636f736d6f732e626c7565736f66742e636f6d2e62722f70726f64756374732f37383936323132343230313137),
(2, 'Cloridrato de Fluoxetina ', '20 mg', 'mg', '30', 'R$16,54', 0x68747470733a2f2f6431786473736e7065657a386b302e636c6f756466726f6e742e6e65742f437573746f6d2f436f6e74656e742f50726f64756374732f31342f31342f31343134305f636c6f7269647261746f2d64652d666c756f786574696e612d746575746f2d32306d672d63616978612d636f6d2d33302d63617073756c61732d67656c6174696e6f7361732d64757261732d70373839363131323132353631375f6c315f3633373231373832333233393333333037312e6a7067),
(3, 'Frontal Alprazolam', '0,5 mg', 'Mg', '30', 'R$ 53,01', 0x68747470733a2f2f6431786473736e7065657a386b302e636c6f756466726f6e742e6e65742f437573746f6d2f436f6e74656e742f50726f64756374732f35372f38342f353738345f66726f6e74616c2d302d356d672d63616978612d636f6d2d33302d636f6d7072696d69646f732d70373839313236383130333134345f6c315f3633373231373831363036333734383632312e6a7067),
(4, 'Histadin D Loratadina', '5 mg/120mg', 'mg', '12', 'R$43,80', 0x68747470733a2f2f6431786473736e7065657a386b302e636c6f756466726f6e742e6e65742f437573746f6d2f436f6e74656e742f50726f64756374732f31302f35332f31303533385f686973746164696e2d642d636f6d7072696d69646f2d356d672d3132306d672d63616978612d636f6d2d31322d647261676561732d64652d646573696e746567726163616f2d6c656e74612d70373839363030363234383331365f6c315f3633373231373832303330393839393539382e6a7067),
(5, 'Dorflex', '300mg + 35mg + 50mg', 'mg', '36', 'R$ 17,68', 0x68747470733a2f2f7777772e64726f67617269616e65742e636f6d2e62722f6d656469612f70726f647563742f3834652f616e616c67657369636f2d646f72666c65782d33362d636f6d7072696d69646f732d3863612e6a7067),
(6, 'Metilfenidato (Ritalina)', '10mg', 'mg', '60', 'R$88,69', 0x68747470733a2f2f73322e676c62696d672e636f6d2f63337668647a314d676c6347346667595044466a58706a746f6f453d2f3078303a353232783433302f39383478302f736d6172742f66696c746572733a73747269705f69636328292f692e73332e676c62696d672e636f6d2f76312f415554485f35396564643432326330633834613837396264333736373061653466353338612f696e7465726e616c5f70686f746f732f62732f323032332f472f462f4a4356704659524532376d56576f434f687849672f636170747572612d64652d74656c612d323032332d30312d33312d3131313035332e706e67),
(7, 'Ibuprofeno', '400 mg', 'Mg', '10', 'R$ 21,99', 0x68747470733a2f2f696f2e636f6e7665727469657a2e636f6d2e62722f6d2f64726f67616c2f73686f702f70726f64756374732f696d616765732f353533303031342f6d656469756d2f69627570726f66656e6f2d3430306d672d313063702d672d6e2d715f373137312e6a7067),
(8, 'Propranolol ', '40 mg', 'mg', '60', 'R$ 20,00', 0x68747470733a2f2f7669706661726d612e636f6d2e62722f6d656469612f636174616c6f672f70726f647563742f63616368652f312f696d6167652f39646637386561623333353235643038643665356662386432373133366539352f672f652f6765726d65645f3130332e706e67),
(9, 'Cloridato de Ondasetrona', '4 Mg', 'Mg', '10', 'R$ 19,19', 0x68747470733a2f2f696d616765732e7463646e2e636f6d2e62722f696d672f696d675f70726f642f3734353239342f766f6c69675f346d675f636f6d5f31305f636f6d7072696d69646f735f6c656772616e645f353435395f315f35666533336464356430313335663432633236356639653337386230383762372e6a7067),
(10, 'Ofolato', '8,5 Mg', 'Mg', '90', 'R$ 133,89', 0x68747470733a2f2f75706c6f6164732e636f6e73756c746172656d6564696f732e636f6d2e62722f70726f647563745f766172696174696f6e5f696d616765732f66756c6c2f313534626130646533333539643433336132656261616261383466386666306562316638396536612e6a70673f31363336303437313930);


-- --------------------------------------------------------

--
-- Estrutura da tabela `medico`
--

CREATE TABLE `medico` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `nascimento` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefone` varchar(100) NOT NULL,
  `cpf` varchar(15) NOT NULL,
  `senha` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `medico`
--

INSERT INTO `medico` (`id`, `nome`, `nascimento`, `email`, `telefone`, `cpf`, `senha`) VALUES
(20, 'bruno pereira de carvalho pinto', '', 'brunocarvpinto@gmail.com', '(21) 9814-64062', 2147483647, '4321'),
(21, 'bruno', '', 'bruno@', '21', 1, ''),
(22, 'teste', '', 'teste', 'teste', 0, '');

-- --------------------------------------------------------

--
-- Estrutura da tabela `paciente`
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
-- Extraindo dados da tabela `paciente`
--

INSERT INTO `paciente` (`id`, `nome`, `nascimento`, `email`, `telefone`, `cpf`, `senha`) VALUES
(2, 'joao', '07/01/2001', 'joao@', '9876543', '2', '1'),
(3, 'bruno', '23', 'teste', '76543', '10', '10');

-- --------------------------------------------------------

--
-- Estrutura da tabela `receita`
--

CREATE TABLE `receita` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `cpf` int(11) NOT NULL,
  `telefone` int(11) NOT NULL,
  `idade` int(11) NOT NULL,
  `data` varchar(255) NOT NULL,
  `medico` varchar(255) NOT NULL,
  `remedio` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `consulta`
--
ALTER TABLE `consulta`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `exames`
--
ALTER TABLE `exames`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `medicamentos`
--
ALTER TABLE `medicamentos`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `medico`
--
ALTER TABLE `medico`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `receita`
--
ALTER TABLE `receita`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `consulta`
--
ALTER TABLE `consulta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `exames`
--
ALTER TABLE `exames`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de tabela `medicamentos`
--
ALTER TABLE `medicamentos`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `medico`
--
ALTER TABLE `medico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de tabela `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `receita`
--
ALTER TABLE `receita`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
