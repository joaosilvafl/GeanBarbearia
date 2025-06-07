// server.js (ou crud.js)

const express = require('express');
const { Client } = require('pg'); // Usando Client para uma única conexão

const app = express();
const PORT = 3000; // Porta do seu servidor Express (5432 é a do PostgreSQL)

// --- Configuração da Conexão com o Banco de Dados ---
const db = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'barbearia',
    password: 'next23',
    port: 5432, // Porta padrão do PostgreSQL
});

// Conecta ao banco de dados
db.connect()
    .then(() => console.log('Conexão bem-sucedida ao banco de dados PostgreSQL'))
    .catch(err => console.error('Erro ao conectar ao banco de dados:', err.stack));

// --- Middlewares do Express ---
// Middleware para servir arquivos estáticos (HTML, CSS, JS, imagens)
// Certifique-se de que seus arquivos HTML/CSS/JS estão na pasta 'public'
app.use(express.static('public'));

// Middleware para parsear JSON no corpo das requisições
app.use(express.json());

// --- ROTAS DA API ---

// ----------------------------------------------------
// ROTAS PARA CLIENTES (/api/clientes)
// ----------------------------------------------------

// GET: Obter todos os clientes
app.get('/api/clientes', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM clientes ORDER BY nome');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Erro ao buscar clientes:', err);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar clientes' });
    }
});

// GET: Obter um cliente por ID
app.get('/api/clientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM clientes WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao buscar cliente por ID:', err);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar cliente' });
    }
});

// POST: Criar um novo cliente
app.post('/api/clientes', async (req, res) => {
    const { nome, email, telefone } = req.body;
    if (!nome) {
        return res.status(400).json({ message: 'O nome do cliente é obrigatório.' });
    }
    try {
        const query = 'INSERT INTO clientes (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *';
        const result = await db.query(query, [nome, email, telefone]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao criar cliente:', err);
        res.status(500).json({ error: 'Erro interno do servidor ao criar cliente' });
    }
});

// PUT: Atualizar um cliente existente
app.put('/api/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;
    try {
        const query = 'UPDATE clientes SET nome = $1, email = $2, telefone = $3 WHERE id = $4 RETURNING *';
        const result = await db.query(query, [nome, email, telefone, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Cliente não encontrado para atualização' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao atualizar cliente:', err);
        res.status(500).json({ error: 'Erro interno do servidor ao atualizar cliente' });
    }
});

// DELETE: Deletar um cliente
app.delete('/api/clientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM clientes WHERE id = $1 RETURNING id');
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Cliente não encontrado para exclusão' });
        }
        res.status(204).send(); // 204 No Content para exclusão bem-sucedida
    } catch (err) {
        console.error('Erro ao deletar cliente:', err);
        res.status(500).json({ error: 'Erro interno do servidor ao deletar cliente' });
    }
});

// ----------------------------------------------------
// ROTAS PARA SERVICOS (/api/servicos)
// ----------------------------------------------------

// GET: Obter todos os serviços
app.get('/api/servicos', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM servicos ORDER BY nome');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Erro ao buscar serviços:', err);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar serviços' });
    }
});

// GET: Obter um serviço por ID
app.get('/api/servicos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM servicos WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Serviço não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao buscar serviço por ID:', err);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar serviço' });
    }
});

// POST: Criar um novo serviço
app.post('/api/servicos', async (req, res) => {
    const { nome, preco } = req.body;
    if (!nome || !preco) {
        return res.status(400).json({ message: 'Nome e preço do serviço são obrigatórios.' });
    }
    try {
        const query = 'INSERT INTO servicos (nome, preco) VALUES ($1, $2) RETURNING *';
        const result = await db.query(query, [nome, preco]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao criar serviço:', err);
        res.status(500).json({ error: 'Erro interno do servidor ao criar serviço' });
    }
});

// PUT: Atualizar um serviço existente
app.put('/api/servicos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, preco } = req.body;
    try {
        const query = 'UPDATE servicos SET nome = $1, preco = $2 WHERE id = $3 RETURNING *';
        const result = await db.query(query, [nome, preco, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Serviço não encontrado para atualização' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao atualizar serviço:', err);
        res.status(500).json({ error: 'Erro interno do servidor ao atualizar serviço' });
    }
});

// DELETE: Deletar um serviço
app.delete('/api/servicos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM servicos WHERE id = $1 RETURNING id');
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Serviço não encontrado para exclusão' });
        }
        res.status(204).send(); // 204 No Content para exclusão bem-sucedida
    } catch (err) {
        console.error('Erro ao deletar serviço:', err);
        res.status(500).json({ error: 'Erro interno do servidor ao deletar serviço' });
    }
});

// ----------------------------------------------------
// ROTAS PARA HORARIOS (AGENDAMENTOS) (/api/horarios)
// ----------------------------------------------------

// GET: Obter todos os horários (com detalhes de cliente e serviço)
app.get('/api/horarios', async (req, res) => {
    try {
        const query = `
            SELECT
                h.id,
                h.data,
                h.hora,
                c.nome AS cliente_nome,
                c.email AS cliente_email,
                c.telefone AS cliente_telefone,
                s.nome AS servico_nome,
                s.preco AS servico_preco
            FROM horarios h
            JOIN clientes c ON h.cliente_id = c.id
            JOIN servicos s ON h.servico_id = s.id
            ORDER BY h.data, h.hora;
        `;
        const result = await db.query(query);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Erro ao buscar horários:', err);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar horários' });
    }
});

// GET: Obter um horário por ID (com detalhes de cliente e serviço)
app.get('/api/horarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = `
            SELECT
                h.id,
                h.data,
                h.hora,
                c.nome AS cliente_nome,
                c.email AS cliente_email,
                c.telefone AS cliente_telefone,
                s.nome AS servico_nome,
                s.preco AS servico_preco
            FROM horarios h
            JOIN clientes c ON h.cliente_id = c.id
            JOIN servicos s ON h.servico_id = s.id
            WHERE h.id = $1;
        `;
        const result = await db.query(query, [id]); // Linha corrigida e completada
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Horário não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao buscar horário por ID:', err);
        res.status(500).json({ error: 'Erro interno do servidor ao buscar horário' });
    }
});

// POST: Criar um novo horário
app.post('/api/horarios', async (req, res) => {
    const { cliente_id, servico_id, data, hora } = req.body;
    if (!cliente_id || !servico_id || !data || !hora) {
        return res.status(400).json({ message: 'Cliente, serviço, data e hora são obrigatórios para o agendamento.' });
    }
    try {
        const query = 'INSERT INTO horarios (cliente_id, servico_id, data, hora) VALUES ($1, $2, $3, $4) RETURNING *';
        const result = await db.query(query, [cliente_id, servico_id, data, hora]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao criar horário:', err);
        res.status(500).json({ error: 'Erro interno do servidor ao criar horário' });
    }
});

// PUT: Atualizar um horário existente
app.put('/api/horarios/:id', async (req, res) => {
    const { id } = req.params;
    const { cliente_id, servico_id, data, hora } = req.body;
    try {
        const query = 'UPDATE horarios SET cliente_id = $1, servico_id = $2, data = $3, hora = $4 WHERE id = $5 RETURNING *';
        const result = await db.query(query, [cliente_id, servico_id, data, hora, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Horário não encontrado para atualização' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao atualizar horário:', err);
        res.status(500).json({ error: 'Erro interno do servidor ao atualizar horário' });
    }
});

// DELETE: Deletar um horário
app.delete('/api/horarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM horarios WHERE id = $1 RETURNING id');
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Horário não encontrado para exclusão' });
        }
        res.status(204).send(); // 204 No Content para exclusão bem-sucedida
    } catch (err) {
        console.error('Erro ao deletar horário:', err);
        res.status(500).json({ error: 'Erro interno do servidor ao deletar horário' });
    }
});

// --- Inicia o Servidor ---
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse seu site em: http://localhost:${PORT}/index.html`);
    console.log(`Para testar as APIs (use Insomnia/Postman):`);
    console.log(` - Clientes: http://localhost:${PORT}/api/clientes`);
    console.log(` - Serviços: http://localhost:${PORT}/api/servicos`);
    console.log(` - Horários: http://localhost:${PORT}/api/horarios`);
});
