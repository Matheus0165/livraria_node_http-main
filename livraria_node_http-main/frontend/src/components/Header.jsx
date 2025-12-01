// frontend/src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <h1>📚 Livraria</h1>
        </Link>

        <nav className="nav">
          {/* Links principais */}
          <Link to="/" className="nav-link">Início</Link>
          <Link to="/livros" className="nav-link">Livros</Link>
          {user && (
            <Link to="/favoritos" className="nav-link">Meus Favoritos</Link>
          )}

          {/* Botão de tema */}
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Escuro' : '☀️ Claro'}
          </button>

          {/* Área de login / usuário */}
          {user ? (
            <div className="user-info">
              <span>Olá, {user.username || user.email}!</span>
              <button onClick={handleLogout} className="btn btn-secondary">
                Sair
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Registrar</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
