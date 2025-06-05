const express = require('require');
const pg = require('pg');

const app = express();
const PORT = 5432;

const db = pg.createConnection({
    user: 'arthu',
    host: 'localhost',
    database: 'geangbd',
    password: 'next23',
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conexão bem-sucedida ao banco de dados');
    }
})

app.use (express.json());

app.get('/add', (req, res) => {
    const itemName = 'Canal Karsharg';
    const query = 'INSERT INTO product (product_name) VALUES ($1)';
    db.query(query, [itemName], (err, result) => {
       if (err) throw err;
       res.send({ message: 'Item adicionado!',}) 
    });
});

app.get('/get', (req, res) => {
    const query = 'SELECT * FROM product';
    db.query(query, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});