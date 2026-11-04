create database MesaCheiaDB;
use MesaCheiaDB;
drop database MesaCheiaDB;

create table alimentos (
  id int primary key auto_increment,
  nome varchar(100),
  categoria varchar(50),
  unidade varchar(10)
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
  instituicao_id int,
  nome_doador varchar(100),
  email_doador varchar(100),
  foreign key (alimento_id) references alimentos(id),
  foreign key (instituicao_id) references instituicao(id)
);

create table doacao_dinheiro (
  id int primary key auto_increment,
  data_doacao date,
  valor int,
  instituicao_id int,
  nome_doador varchar(100),
  email_doador varchar(100),
  foreign key (instituicao_id) references instituicao(id)
);

create table contatos (
  id int primary key auto_increment,
  nome varchar(100),
  email varchar(100),
  mensagem varchar(500),
  usuario_id int,
  instituicao_id int,
  foreign key (usuario_id) references usuarios(id),
  foreign key (instituicao_id) references instituicao(id)
);

insert into instituicao (nome, cnpj, telefone, endereco, cidade) values
('Cozinha Solidária Bom Prato', '11.111.111/0001-11', '(11) 4000-1001', 'Rua das Flores, 100', 'São Paulo'),
('Associação Mesa Farta', '22.222.222/0001-22', '(11) 4000-1002', 'Av. Central, 200', 'São Paulo'),
('Instituto Mão Amiga', '33.333.333/0001-33', '(19) 4000-1003', 'Rua da Paz, 300', 'Campinas'),
('Banco de Alimentos Esperança', '44.444.444/0001-44', '(19) 4000-1004', 'Av. Brasil, 400', 'Campinas'),
('Refeitório Comunitário Santa Luzia', '55.555.555/0001-55', '(13) 4000-1005', 'Rua do Porto, 500', 'Santos'),
('Projeto Pão Nosso', '66.666.666/0001-66', '(13) 4000-1006', 'Rua da Praia, 600', 'Santos');

insert into alimentos (nome, categoria, unidade) values
('Arroz', 'grãos', 'kg'),
('Feijão', 'grãos', 'kg'),
('Macarrão', 'massas', 'pacotes'),
('Óleo', 'óleos', 'litros'),
('Açúcar', 'básicos', 'kg'),
('Farinhas', 'básicos', 'kg'),
('Café', 'básicos', 'pacotes'),
('Leite', 'bebidas', 'litros'),
('Leite em pó', 'bebidas', 'pacotes'),
('Enlatados', 'enlatados', 'unidades'),
('Cesta básica', 'kits', 'unidades'),
('Carnes congeladas', 'carnes', 'kg'),
('Frutas', 'hortifruti', 'kg'),
('Verduras', 'hortifruti', 'kg'),
('Legumes', 'hortifruti', 'kg');

select * from usuarios;
select * from instituicao;
select * from alimentos;
select * from doacao_dinheiro;
select * from doacao_alimento;
select * from estoque;