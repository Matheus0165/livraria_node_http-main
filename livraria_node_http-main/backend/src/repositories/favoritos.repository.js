// src/repositories/favoritos.repository.js
const db = require('../database/sqlite');

class FavoritosRepository {
  listarPorUsuario(userId) {
    const sql = `
      SELECT l.*
      FROM favorites f
      JOIN livros l ON l.id = f.book_id
      WHERE f.user_id = ?
      ORDER BY l.titulo;
    `;
    return db.all(sql, [userId]);
  }

  adicionar(userId, bookId) {
    const sql = `
      INSERT OR IGNORE INTO favorites (user_id, book_id)
      VALUES (?, ?);
    `;
    return db.run(sql, [userId, bookId]);
  }

  remover(userId, bookId) {
    const sql = `
      DELETE FROM favorites
      WHERE user_id = ? AND book_id = ?;
    `;
    return db.run(sql, [userId, bookId]);
  }

  ehFavorito(userId, bookId) {
    const sql = `
      SELECT 1 AS ok
      FROM favorites
      WHERE user_id = ? AND book_id = ?
      LIMIT 1;
    `;
    const row = db.get(sql, [userId, bookId]);
    return !!row;
  }
}

module.exports = new FavoritosRepository();
