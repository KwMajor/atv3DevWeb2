create database crud;

use crud; 

CREATE TABLE projetos (
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100),
descricao TEXT
);

CREATE TABLE tecnologias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100)
);


create table formacao (
id int auto_increment primary key,
instituicao varchar(255),
curso varchar(255),
anoDeConclusao varchar(30)
);

CREATE TABLE projeto_tecnologia (
  projeto_id INT,
  tecnologia_id INT,
  FOREIGN KEY (projeto_id) REFERENCES projetos(id),
  FOREIGN KEY (tecnologia_id) REFERENCES tecnologias(id)
);



