// backend/src/app.js
const app = require('./config/express');

// Inicializa o banco de dados SQLite
const db = require('./database/sqlite');
db.init();

// Rotas
const routes = require('./routes');
const favoritosRoutes = require('./routes/favoritos.routes');

// Middlewares
const errorHandler = require('./middlewares/errorHandler');

// Rotas principais em /api
app.use('/api', routes);

// Rotas de favoritos também em /api
app.use('/api/favoritos', favoritosRoutes);

// Middleware de erro (depois das rotas)
app.use(errorHandler);

// 404 por último
app.use((req, res) => {
  res.status(404).json({ erro: 'Endpoint não encontrado' });
});

module.exports = app;
