import React from 'react';
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

class NoteApp extends React.Component
{
  constructor(props){
    super(props);

    this.state = {
      authedUser: null,
      isLoading: true,
    }
  }

  async componentDidMount() {
    try {
      const {data } = await getUserLogged();
      this.setState({ authedUser: data, isLoading: false });
    } catch (error) {
      console.error('Auth check error:', error);
      this.setState({ isLoading: false });
    }
  }

  onLoginSuccess = async (user) => {
    try {
      putAccessToken(user.accessToken);
      const { error, data } = await getUserLogged();
      if (!error && data) {
        this.setState({ authedUser: data });
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  onAuthLogout = () => {
    this.setState({ authedUser: null });
    putAccessToken("")
    window.location.reload();
  };

  renderContent(){
    const {authedUser} = this.state;

    if(!authedUser){
      return (
        <Routes>
          <Route path="/login" element={<LoginPage onLoginSuccess={this.onLoginSuccess} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      );
    }else{
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
  }
  
  render(){
    const {isLoading} = this.state;

    if(isLoading){
      return <div>Loading.....</div>
    }

    return (
      <div className="app-container">
        <header>
          <Navbar
            onLogout={this.onAuthLogout}
          />
        </header>
        <main>{this.renderContent()}</main>
      </div>
    );
  }
  
}

export default NoteApp;
