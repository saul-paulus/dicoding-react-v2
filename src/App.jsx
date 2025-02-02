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
import { getUserLogged, putAccessToken } from './utils/apiAuth';

class NoteApp extends React.Component
{
  constructor(props){
    super(props);

    this.state = {
      authedUser: null,
      isLoading: true,
    }
  }

  async componentDidMount(){
    const {user} = await getUserLogged();
    this.setState({authedUser: user, isLoading: false});
  }

  onLoginSuccess = async ({accessToken})=>{
    try{
      putAccessToken(accessToken);
      const {user} = await  getUserLogged();
      this.setState({authedUser: user});
    }catch(error){
      console.error('Login error:', error);
    }
  }
 
  renderContent(){
    const {authedUser} = this.state;

    if(authedUser === null){
      return (
        <Routes>
          <Route path="/login" element={<LoginPage onLoginSuccess={this.onLoginSuccess} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      );
    }
    
    return (
      <Routes>
        <Route path="/" element={<BerandaPage />} />
        <Route path="/note/:id" element={<DetailPage />} />
        <Route path="/arsip" element={<ArsipPage />} />
        <Route path="/tambah" element={<TambahPage />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotPages />} />
      </Routes>
    );
  }
  
  render(){
    const {isLoading} = this.state;

    if(isLoading){
      return <div>Loading.....</div>
    }

    return (
      <div className="app-container">
        <header>
          <Navbar user={this.state.authedUser}/>
        </header>
        <main>{this.renderContent()}</main>
      </div>
    );
  }
  
}

export default NoteApp;
