# Imobiliária Morar Bem

Catálogo de imóveis com captação de leads.

## Setup Local

1. Criar banco de dados:
   ```
   sudo -iu postgres psql
   \i schema.sql
   ```

2. Instalar dependências:
   ```
   npm install
   ```

3. Criar .env:
   ```
   cp .env.example .env
   ```

4. Rodar servidor:
   ```
   npm start
   ```

Acesso: http://localhost:3000

## Deploy no Render

1. Conectar GitHub ao Render
2. Criar novo Web Service
3. Environment Variables:
   - DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
4. Build: npm install
5. Start: node server.js

## Endpoints

- GET /api/imoveis
- POST /api/leads
- GET /api/leads
