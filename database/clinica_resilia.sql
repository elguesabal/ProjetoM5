-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 07-Mar-2023 às 19:54
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

INSERT INTO `consulta` (`id`, `data`, `horario`, `cliente`, `clientesobre`, `email`, `sintomas`, `consultacpf_cliente`, `id_medico`) VALUES
(5, 'Quarta-feira', '14:00', 'Maria', 'Bonita', 'maria_bonita@gmail.com', 'Dor de cabeça e no corpo.', '111.111.111-11', '29');

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
(9, 'Hemograma', 'Dr. Lampião', '', 'Maria Bonita', '111.111.111-11', 'Terça-feira', '11:00:00');

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
(10, 'Ofolato', '8,5 Mg', 'Mg', '90', 'R$ 133,89', 0x68747470733a2f2f75706c6f6164732e636f6e73756c746172656d6564696f732e636f6d2e62722f70726f647563745f766172696174696f6e5f696d616765732f66756c6c2f313534626130646533333539643433336132656261616261383466386666306562316638396536612e6a70673f31363336303437313930),
(12, 'Paracetamol', '500mg', 'mg', '20', 'R$ 10.50', 0x68747470733a2f2f6661726d6132322e76746578696d672e636f6d2e62722f6172717569766f732f6964732f3136313939322d313030302d313030302f50617261636574616d6f6c2d3530306d672d32302d636f6d7072696d69646f732e6a70673f763d363335393438353238313235343030303030),
(14, 'Aspirina', '500mg', 'mg', '20', 'R$ 7.50', 0x68747470733a2f2f6661726d6163696164656c706173656f2e65732f77702d636f6e74656e742f75706c6f6164732f323032312f30362f3731323738362d612e6a7067),
(15, 'Dipirona', '500mg', 'mg', '20', 'R$5.75', 0x68747470733a2f2f7777772e6661726d616369616d69782e636f6d2e62722f696d6167656e732d636f6d706c6574652f383030783830302f64697069726f6e612d3530306d672d636f6d2d32302d636f6d7072696d69646f732d663562343539393864312e6a7067),
(16, 'Amoxicilina', '500mg', 'mg', '21', 'R$15.20', 0x68747470733a2f2f74682e62696e672e636f6d2f74682f69642f522e36326639633834353661373963326238366333343434386530626439633535663f72696b3d6b4d56696c5266795473554c5941267069643d496d6752617726723d30),
(17, 'Omeprazol', '20mg', 'mg', '28', 'R$18.50', 0x68747470733a2f2f63646e2d636f736d6f732e626c7565736f66742e636f6d2e62722f70726f64756374732f37383936343232353034333739),
(18, 'Cetirizina', '10mg', 'mg', '12', 'R$7.99', 0x68747470733a2f2f74682e62696e672e636f6d2f74682f69642f4f49502e732d4f6e5a5741754c4c5761456a614b47424c345977486148613f7069643d496d674465742672733d31),
(20, 'Loratadina', '10mg', 'mg', '12', 'R$12.00', 0x68747470733a2f2f64726f676172696173702e76746578696d672e636f6d2e62722f6172717569766f732f6964732f3435303737392d313030302d313030302f3130373433332d2d2d6c6f7261746164696e612d31306d672d67656e657269636f2d72616e626178792d6661726d2d31322d636f6d7072696d69646f732e6a70673f763d363337353430303838313639373730303030),
(21, 'Sinvastatina', '20mg', 'mg', '30', 'R$22.50', 0x68747470733a2f2f74682e62696e672e636f6d2f74682f69642f522e32653562306431663737323766616538393864346265636464346331373334333f72696b3d46516b7a5a4a56384343436e7467267069643d496d6752617726723d30);

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
(24, 'Matheus Osvaldo Caldeira', '1970-01-08', 'matheus.pedro.caldeira@sociedadeweb.com.br', '(21) 98959-3107', '836.188.087-98', 'TMRWNIOSCF'),
(25, 'Yago Osvaldo Peixoto', '1951-02-27', 'yago.osvaldo.peixoto@brasildakar.com.br', '(22) 99523-0597', '855.640.607-68', 'FIP5CeWofK'),
(26, 'Fábio Leandro Costa', '1987-02-04', 'fabio-costa93@fabiooliva.com.br', '(21) 99805-0298', '932.727.507-11', 'oMfO8Yea1o'),
(27, 'Cecília Giovanna Farias', '1976-01-24', 'cecilia_giovanna_farias@fitttransportes.com.br', '(21) 98731-2847', '090.849.727-08', 'R1crugAwLL'),
(28, 'Pietro Ryan Nogueira', '1976-02-27', 'pietroryannogueira@demasi.com.br', '(21) 99441-7732', '185.395.857-31', 'nygz2GSLZ7'),
(29, 'Lampião', '1965-05-02', 'lamp@gmail.com', '(21) 98765-4321', '222.222.222-22', 'lampiao123');

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
(7, 'Marcela Laura  Duarte', '1956-03-05', 'marcela_duarte@pozzer.net', '(21) 98404-6017', '161.683.127-81', 'nys7QRWJK9'),
(8, 'Silvana Emanuelly  Nunes', '1943-03-04', 'silvana_emanuelly_nunes@willia', '(21) 2564-0497', '829.342.117-70', 'RmyeQuCTlg'),
(9, 'Milena Joana  Pinto', '1983-01-18', 'milena_pinto@alliancarh.com.br', '(21) 98586-1034', '051.844.187-33', 'aAnp006sSk'),
(10, 'Amanda Luiza  Fernandes', '1957-03-06', 'amanda-fernandes92@i9tec.com.b', '(21) 99852-1811', '929.755.567-56', 'nZSPKwdCcz'),
(11, 'Matheus Carlos  Silva', '1963-03-03', 'matheus.carlos.silva@rcstechno', '(21) 98612-0538', '931.175.147-24', 'DDY9765wlz'),
(12, 'Maria Bonita', '1978-07-09', 'maria_bonita@gmail.com', '(21) 91234-5678', '111.111.111-11', 'maria123');

-- --------------------------------------------------------

--
-- Estrutura da tabela `receita`
--

CREATE TABLE `receita` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `cpf` varchar(255) NOT NULL,
  `telefone` int(11) NOT NULL,
  `idade` int(11) NOT NULL,
  `data` varchar(255) NOT NULL,
  `medico` varchar(255) NOT NULL,
  `remedio` varchar(255) NOT NULL,
  `prescricao` varchar(255) NOT NULL
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `exames`
--
ALTER TABLE `exames`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de tabela `medicamentos`
--
ALTER TABLE `medicamentos`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de tabela `medico`
--
ALTER TABLE `medico`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de tabela `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `receita`
--
ALTER TABLE `receita`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
