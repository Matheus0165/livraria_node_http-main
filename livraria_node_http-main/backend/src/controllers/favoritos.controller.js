// backend/src/controllers/favoritos.controller.js
const favoritosRepository = require('../repositories/favoritos.repository');

function getUserIdFromRequest(req) {
  // Usa o usuário da sessão, se existir.
  if (req.session && req.session.userId) {
    return req.session.userId;
  }
  // Fallback opcional: se algum middleware colocar req.user
  if (req.user && req.user.id) {
    return req.user.id;
  }
  // Fallback FINAL: usuário 1 (apenas para testes locais)
  return 1;
}

class FavoritosController {
  listar(req, res, next) {
    try {
      const userId = getUserIdFromRequest(req);
      const livros = favoritosRepository.listarPorUsuario(userId);
      res.json(livros);
    } catch (err) {
      next(err);
    }
  }

  adicionar(req, res, next) {
    try {
      const userId = getUserIdFromRequest(req);
      const { bookId } = req.params;

      favoritosRepository.adicionar(userId, Number(bookId));
      res.status(201).json({ mensagem: 'Livro favoritado' });
    } catch (err) {
      next(err);
    }
  }

  remover(req, res, next) {
    try {
      const userId = getUserIdFromRequest(req);
      const { bookId } = req.params;

      favoritosRepository.remover(userId, Number(bookId));
      res.json({ mensagem: 'Livro removido dos favoritos' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new FavoritosController();
