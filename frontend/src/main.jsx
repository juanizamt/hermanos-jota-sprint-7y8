// frontend/src/main.jsx

import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App.jsx';
import './css/Hermanos-Jota-estilos.css';
import { AuthProvider } from './context/AuthContext';
import { createRoot } from 'react-dom/client'
import './css/Hermanos-Jota-estilos.css' 
import { CartProvider } from './context/CartContext.jsx';
import { BrowserRouter } from 'react-router-dom';


const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
        <CartProvider>
            <App />
        </CartProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)