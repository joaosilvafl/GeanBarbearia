horarios_selects.sql:

SELECT
    h.id AS id_horario,
    c.nome AS nome_cliente,
    c.telefone AS telefone_cliente,
    s.nome AS nome_servico,
    s.preco AS preco_servico,
    h.data AS data_agendamento,
    h.hora AS hora_agendamento
FROM
    horarios h
JOIN
    clientes c ON h.cliente_id = c.id
JOIN
    servicos s ON h.servico_id = s.id
ORDER BY
    h.data ASC, h.hora ASC;