CREATE TABLE imoveis (
  id SERIAL PRIMARY KEY,
  tipo VARCHAR(50) NOT NULL,
  endereco VARCHAR(255) NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  descricao TEXT,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  imovel_id INTEGER NOT NULL REFERENCES imoveis(id),
  telefone VARCHAR(20) NOT NULL,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO imoveis (tipo, endereco, cidade, preco, descricao) VALUES
('Apartamento', 'Rua A, 123', 'Palhoça', 350000.00, 'Apto 2 quartos, 1 suíte, próximo ao mar'),
('Casa', 'Rua B, 456', 'Pinheira', 550000.00, 'Casa 3 quartos, garagem, piscina'),
('Apartamento', 'Rua C, 789', 'Palhoça', 280000.00, 'Apto 1 quarto, bem localizado'),
('Casa', 'Rua D, 101', 'Pinheira', 720000.00, 'Casa 4 quartos, edícula, terreno grande'),
('Apartamento', 'Rua E, 202', 'Palhoça', 420000.00, 'Apto 3 quartos, vista para o mar');
