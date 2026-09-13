import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Customizer from './pages/Customizer';
import Specification from './pages/Specification';

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customize" element={<Customizer />} />
            <Route path="/specification" element={<Specification />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <AuthModal />
      </div>
    </AuthProvider>
  );
}

export default App;
