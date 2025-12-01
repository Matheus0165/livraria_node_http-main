import React, { useState, useEffect } from 'react';
import { livrosService } from '../services/livrosService';
import LivroCard from '../components/LivroCard';
import LivroForm from '../components/LivroForm';
import api from '../services/api';
import './Livros.css';

const Livros = () => {
  const [livros, setLivros] = useState([]);
  const [favoritosIds, setFavoritosIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingLivro, setEditingLivro] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    carregarLivros();
    carregarFavoritos();
  }, []);

  const carregarLivros = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await livrosService.listar();
      setLivros(data);
    } catch (err) {
      setError('Erro ao carregar livros. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const carregarFavoritos = async () => {
    try {
      const resp = await api.get('/favoritos');
      const ids = new Set(resp.data.map((l) => l.id));
      setFavoritosIds(ids);
    } catch (err) {
      console.error('Erro ao carregar favoritos:', err);
    }
  };

  const handleCreate = () => {
    setEditingLivro(null);
    setShowForm(true);
  };

  const handleEdit = (livro) => {
    setEditingLivro(livro);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja remover este livro?')) {
      return;
    }

    try {
      await livrosService.remover(id);
      showSuccess('Livro removido com sucesso!');
      carregarLivros();

      // remove dos favoritos se estiver lá
      if (favoritosIds.has(id)) {
        const novo = new Set(favoritosIds);
        novo.delete(id);
        setFavoritosIds(novo);
      }
    } catch (err) {
      setError('Erro ao remover livro. Tente novamente.');
      console.error(err);
    }
  };

  const handleSubmit = async (livro) => {
    try {
      if (livro.id) {
        await livrosService.atualizar(livro.id, livro);
        showSuccess('Livro atualizado com sucesso!');
      } else {
        await livrosService.criar(livro);
        showSuccess('Livro criado com sucesso!');
      }
      setShowForm(false);
      setEditingLivro(null);
      carregarLivros();
    } catch (err) {
      setError(err.response?.data?.erro || 'Erro ao salvar livro. Tente novamente.');
      console.error(err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingLivro(null);
  };

  const handleToggleFavorite = async (bookId) => {
    const isFav = favoritosIds.has(bookId);

    try {
      if (isFav) {
        await api.delete(`/favoritos/${bookId}`);
        const novo = new Set(favoritosIds);
        novo.delete(bookId);
        setFavoritosIds(novo);
      } else {
        await api.post(`/favoritos/${bookId}`);
        const novo = new Set(favoritosIds);
        novo.add(bookId);
        setFavoritosIds(novo);
      }
    } catch (err) {
      console.error('Erro ao atualizar favoritos:', err);
      setError('Erro ao atualizar favoritos. Tente novamente.');
    }
  };

  const showSuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Carregando livros...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="livros-header">
        <h1>Gerenciar Livros</h1>
        <button onClick={handleCreate} className="btn btn-primary">
          + Novo Livro
        </button>
      </div>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      {error && <div className="alert alert-error">{error}</div>}

      {livros.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum livro cadastrado ainda.</p>
          <button onClick={handleCreate} className="btn btn-primary">
            Adicionar seu primeiro livro
          </button>
        </div>
      ) : (
        <div className="livros-grid">
          {livros.map((livro) => (
            <LivroCard
              key={livro.id}
              livro={livro}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isFavorite={favoritosIds.has(livro.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}

      {showForm && (
        <LivroForm
          livro={editingLivro}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Livros;
