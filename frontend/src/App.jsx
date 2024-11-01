import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Commands from './pages/Commands';
import Faq from './pages/Faq';
import Privacy from './pages/Privacy';
import Tos from './pages/Tos';
import { useUser } from './components/UserContext';
import { UserProvider } from './components/UserContext';
import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import Journey from './pages/JourneyBuilder';
import IdManager from './pages/IdManager';

function App() {
  const { user, login } = useUser();

  useEffect(() => {
    const params = queryString.parse(window.location.search);

    // Check if 'user' parameter exists in URL
    if (params.user) {
      try {
        // Decode and parse the user data
        const userData = JSON.parse(decodeURIComponent(params.user));
        sessionStorage.setItem("user", JSON.stringify(userData));
        login(userData);

        // Clear the query params from URL
        window.history.replaceState({}, document.title, '/');
      } catch (error) {
        console.error('Failed to parse user data from URL:', error);
      }
    }
  }, [login]);

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/commands" element={<Commands />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/tos" element={<Tos />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/admin" element={<IdManager />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default function WrappedApp() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}
