// frontend/src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

import PrivateRoute from './components/PrivateRoute'
import Header from './components/Header'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Livros from './pages/Livros'
import FavoritosPage from './pages/FavoritosPage'

import './App.css'

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app">
                    
                    {/* ✅ Header está acima das rotas */}
                    <Header />

                    <main className="main-content">
                        <Routes>
                            {/* Rotas públicas */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />

                            {/* Rotas privadas */}
                            <Route
                                path="/"
                                element={
                                    <PrivateRoute>
                                        <Home />
                                    </PrivateRoute>
                                }
                            />

                            <Route
                                path="/livros"
                                element={
                                    <PrivateRoute>
                                        <Livros />
                                    </PrivateRoute>
                                }
                            />

                            {/* ✅ Nova rota de favoritos */}
                            <Route
                                path="/favoritos"
                                element={
                                    <PrivateRoute>
                                        <FavoritosPage />
                                    </PrivateRoute>
                                }
                            />

                            {/* Redirecionamento padrão */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    )
}

export default App
