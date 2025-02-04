import React from 'react';
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


class NoteApp extends React.Component
{
  constructor(props){
    super(props);

    this.state = {
      authedUser: null,
      isLoading: true,
      theme: localStorage.getItem('theme') || 'light', 
      toggleTheme: ()=>{
        this.setState((prevState) =>{
          const newTheme = prevState.theme === 'dark' ? 'light' : 'dark';
          localStorage.setItem('theme', newTheme);
          return {theme: newTheme}
          });
      }
    };
  }

  async componentDidMount() {
    try {
      const {data } = await getUserLogged();
      this.setState({ authedUser: data, isLoading: false });
    } catch (error) {
      console.error('Auth check error:', error);
      this.setState({ isLoading: false });
    }
    document.documentElement.setAttribute('data-theme', this.state.theme);
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

  componentDidUpdate(prevProps, prevState){
    if(prevState.theme !== this.state.theme){
      document.documentElement.setAttribute('data-theme', this.state.theme);
    }
  }

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
    const {isLoading, theme, toggleTheme} = this.state;

    if(isLoading){
      return <div>Loading.....</div>
    }

    return (
      <ThemeProvider value={{theme, toggleTheme}}>
        <div className="app-container">
          <header>
            <Navbar
              onLogout={this.onAuthLogout}
            />
            <ToggleTheme/>
          </header>
          <main>{this.renderContent()}</main>
        </div>
      </ThemeProvider>
     
    );
  }
  
}

export default NoteApp;
