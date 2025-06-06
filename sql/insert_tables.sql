INSERT INTO clientes (nome, email, telefone) VALUES
('Ana Silva', 'ana.silva@email.com', '(11) 98765-4321'),
('Bruno Costa', 'bruno.costa@email.com', '(21) 99876-5432'),
('Carla Oliveira', 'carla.oliveira@email.com', '(31) 97654-3210'),
('Daniel Santos', 'daniel.santos@email.com', '(41) 96543-2109'),
('Eduarda Pereira', 'eduarda.pereira@email.com', '(51) 95432-1098');

INSERT INTO servicos (nome, preco) VALUES
('Corte de Cabelo', 50.00),
('Manicure e Pedicure', 75.00),
('Coloração', 150.00),
('Massagem Relaxante', 120.00),
('Limpeza de Pele', 90.00);

INSERT INTO horarios (cliente_id, servico_id, data, hora) VALUES
(1, 1, '2025-06-10', '10:00:00'),
(2, 3, '2025-06-10', '14:30:00'),
(3, 2, '2025-06-11', '09:00:00'),
(4, 5, '2025-06-11', '16:00:00'),
(5, 4, '2025-06-12', '11:00:00'),
(1, 2, '2025-06-12', '14:00:00'),
(2, 1, '2025-06-13', '09:30:00');