// frontend/src/components/LivroCard.jsx
import React from 'react';
import './LivroCard.css';

const LivroCard = ({ livro, onEdit, onDelete, isFavorite, onToggleFavorite }) => {
  const showActions = !!onEdit || !!onDelete;

  const handleEdit = () => {
    if (onEdit) onEdit(livro);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(livro.id);
  };

  return (
    <div className="livro-card">
      <div className="livro-card-header">
        <h3>{livro.titulo}</h3>

        {onToggleFavorite && (
          <button
            className={`fav-btn ${isFavorite ? 'fav-btn-on' : ''}`}
            onClick={() => onToggleFavorite(livro.id)}
            title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        )}
      </div>

      <p className="autor">
        <strong>Autor:</strong> {livro.autor}
      </p>
      <p className="ano">
        <strong>Ano:</strong> {livro.ano}
      </p>
      {livro.editora && (
        <p className="editora">
          <strong>Editora:</strong> {livro.editora}
        </p>
      )}

      {showActions && (
        <div className="card-actions">
          {onEdit && (
            <button onClick={handleEdit} className="btn btn-primary">
              ✏️ Editar
            </button>
          )}
          {onDelete && (
            <button onClick={handleDelete} className="btn btn-danger">
              🗑️ Remover
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default LivroCard;
