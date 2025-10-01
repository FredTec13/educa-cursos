CREATE DATABASE if NOT EXISTS USUARIOS;

USE USUARIOS;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    senha VARCHAR(200) NOT NULL
);

DROP TABLE usuarios;

SELECT * FROM usuarios WHERE (nome, email, senha) = ('lol', 'lol@gmail.com', 'lol123');

INSERT INTO usuarios (nome, email, senha) VALUES ('lol', 'lol@gmail.com', 'lol123');