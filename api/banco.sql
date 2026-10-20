create database MesaCheiaDB;
use MesaCheiaDB;



create table estoque (
  id int primary key auto_increment,
  quantidade int,
  validade date,
  alimento_id int,
  foreign key (alimento_id) references alimentos(id)
);



create table doacao_alimento (
  id int primary key auto_increment,
  alimento_id int,
  data_doacao date,
  usuario_id int,
  instituicao_id int,
  foreign key (usuario_id) references usuarios(id),
  foreign key (alimento_id) references alimentos(id),
  foreign key (instituicao_id) references instituicao(id)
);

create table doacao_dinheiro (
  id int primary key auto_increment,
  data_doacao date,
  valor int,
  usuario_id int,
  instituicao_id int,
  foreign key (usuario_id) references usuarios(id),
  foreign key (instituicao_id) references instituicao(id)
);
create table alimentos (
  id int primary key auto_increment,
  nome varchar(100),
  categoria varchar(50),
  -- bebidas, enltados, frutas e esse tipo de coisa
  unidade varchar(10) 
  -- kilos, unidades, pacotes, litros, gramas etc
);

create table instituicao (
  id int primary key auto_increment,
  nome varchar(100),
  cnpj varchar(20),
  telefone varchar(20),
  endereco varchar(150),
  cidade varchar(100)
);

create table usuarios (
  id int primary key auto_increment,
  nome varchar(100),
  email varchar(100),
  senha varchar(255),
  telefone varchar(20)
);

select * from usuarios;
select * from instituicao;
select * from alimentos;
select * from doacao_dinheiro;
select * from doacao_alimento;
select * from estoque;