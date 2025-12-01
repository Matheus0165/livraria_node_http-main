import React, { useEffect, useState } from 'react';
import LivroCard from '../components/LivroCard';
import api from '../services/api';

export default function FavoritosPage() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    async function carregar() {
      const resp = await api.get('/favoritos');
      setLivros(resp.data);
    }
    carregar();
  }, []);

  async function handleToggleFavorite(bookId) {
    await api.delete(`/favoritos/${bookId}`);
    setLivros(prev => prev.filter(l => l.id !== bookId));
  }

  return (
    <div>
      <h2>Meus Favoritos</h2>

      {livros.length === 0 && <p>Você ainda não favoritou nenhum livro.</p>}

      {livros.map(livro => (
        <LivroCard
          key={livro.id}
          livro={livro}
          isFavorite={true}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </div>
  );
}
