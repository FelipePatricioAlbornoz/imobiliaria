const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const pool = mysql.createPool(
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL
    : {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      }
);
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/api/imoveis', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM imoveis ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error('IMOVEIS ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/leads', async (req, res) => {
  const { imovel_id, telefone } = req.body;

  if (!imovel_id || !telefone) {
    return res.status(400).json({ error: 'Código do imóvel e telefone obrigatórios' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO leads (imovel_id, telefone, data_criacao) VALUES (?, ?, NOW())',
      [imovel_id, telefone]
    );
    res.json({ success: true, lead: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao registrar interesse' });
  }
});

app.get('/api/leads', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM leads ORDER BY data_criacao DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar leads' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});