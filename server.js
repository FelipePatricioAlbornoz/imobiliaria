const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'morar_bem'
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/api/imoveis', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM imoveis ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar imóveis' });
  }
});

app.post('/api/leads', async (req, res) => {
  const { imovel_id, telefone } = req.body;

  if (!imovel_id || !telefone) {
    return res.status(400).json({ error: 'Código do imóvel e telefone obrigatórios' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO leads (imovel_id, telefone, data_criacao) VALUES ($1, $2, NOW()) RETURNING *',
      [imovel_id, telefone]
    );
    res.json({ success: true, lead: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao registrar interesse' });
  }
});

app.get('/api/leads', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM leads ORDER BY data_criacao DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar leads' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
