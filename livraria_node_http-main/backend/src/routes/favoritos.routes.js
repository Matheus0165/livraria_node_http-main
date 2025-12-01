// backend/src/routes/favoritos.routes.js
const express = require('express');
const favoritosController = require('../controllers/favoritos.controller');
const { requireAuth } = require('../middlewares/auth');

const router = express.Router();

// GET /api/favoritos
router.get('/', requireAuth, (req, res, next) =>
  favoritosController.listar(req, res, next)
);

// POST /api/favoritos/:bookId
router.post('/:bookId', requireAuth, (req, res, next) =>
  favoritosController.adicionar(req, res, next)
);

// DELETE /api/favoritos/:bookId
router.delete('/:bookId', requireAuth, (req, res, next) =>
  favoritosController.remover(req, res, next)
);

module.exports = router;
