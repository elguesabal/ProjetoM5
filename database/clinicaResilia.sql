create database clinica_resilia;


create table paciente (
    id int primary key auto_increment,
    nome varchar(30),
    nascimento varchar(10),
    email varchar(30),
    telefone varchar(15),
    cpf varchar(15), -- USUARIO DE LOGIN
    senha varchar(15) -- SENHA DE LOGIN
);