import React from 'react';
import BerandaPage from './pages/BerandaPage';
import DetailPage from './pages/DetailPage';
import ArsipPage from './pages/ArsipPage';
import TambahPage from './pages/TambahPages';
import NotPages from './pages/NotPages';
import Navbar from './componets/layouts/Navbar';
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className="app-container">
       <header>
          <Navbar titleBrand="iNote"/>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<BerandaPage/>}/>
            <Route path="/note/idNote/:id" element={<DetailPage/>}/>
            <Route path="/note/arsip" element={<ArsipPage />}/>
            <Route path="/note/tambah" element={<TambahPage />}/>
            <Route path="*" element={<NotPages/>} />
          </Routes>
        </main>
    </div>
  );
}

export default App;
