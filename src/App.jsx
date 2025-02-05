import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import BerandaPage from './pages/BerandaPage';
import DetailPage from './pages/DetailPage';
import ArsipPage from './pages/ArsipPage';
import TambahPage from './pages/TambahPages';
import NotPages from './pages/NotPages';
import Navbar from './componets/layouts/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { getUserLogged, putAccessToken } from './utils/api';
import ToggleTheme from './contexts/ToggleTheme';

function NoteApp() {
  const [authedUser, setAuthedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');


  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };


  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await getUserLogged();
        setAuthedUser(data);
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkUser();
  }, []);

  const onLoginSuccess = async (user) => {
    try {
      putAccessToken(user.accessToken);
      const { error, data } = await getUserLogged();
      if (!error && data) {
        setAuthedUser(data);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const onAuthLogout = () => {
    setAuthedUser(null);
    putAccessToken('');
    window.location.reload();
  };

  const renderContent = () => {
    if (!authedUser) {
      return (
        <Routes>
          <Route path="/login" element={<LoginPage onLoginSuccess={onLoginSuccess} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path="/" element={<BerandaPage />} />
          <Route path="/note/:id" element={<DetailPage />} />
          <Route path="/arsip" element={<ArsipPage />} />
          <Route path="/tambah" element={<TambahPage />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/register" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotPages />} />
        </Routes>
      );
    }
  };

  if (isLoading) {
    return <div>Loading.....</div>;
  }

  return (
    <ThemeProvider value={{ theme, toggleTheme }}>
      <div className="app-container">
        <header>
          <Navbar onLogout={onAuthLogout} name={authedUser?.name || ''} />
          <ToggleTheme />
        </header>
        <main>{renderContent()}</main>
      </div>
    </ThemeProvider>
  );
}

export default NoteApp;
