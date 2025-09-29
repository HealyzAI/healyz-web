import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import FinHealthAI from './components/FinHealthAI';
import KitchenAI from './components/KitchenAI';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import History from './components/History';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import MyAccount from './components/Account/MyAccount';
import UpgradePage from './components/Upgrade/UpgradePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/finhealth-ai" element={<FinHealthAI />} />
              <Route path="/kitchen-ai" element={<KitchenAI />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/history" element={<History />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/my-account" element={<MyAccount />} />
              <Route path="/upgrade" element={<UpgradePage />} />
            </Routes>        </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

