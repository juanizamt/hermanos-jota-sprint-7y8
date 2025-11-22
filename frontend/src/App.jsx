// frontend/src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ListaProductos from './ListaProductos.jsx';
import ProductoDetalle from './ProductoDetalle.jsx';
import Carrito from './Carrito.jsx'; 
import Contacto from './Contacto.jsx'; 

// Componente para mostrar el Hero Banner en la ruta principal (/)
// Esto asegura que la lógica del Catálogo quede solo en /catalogo
const HeroPage = () => (
    <main>
        <div className="hero-banner">
            <div className="hero-content">
                <h1>¡Bienvenidos a Hermanos Jota!</h1>
                <p>Tu tienda de muebles de diseño y calidad. Descubre nuestras últimas colecciones.</p>
                <Link to="/catalogo" className="btn">Ver Catálogo</Link>
            </div>
        </div>
    </main>
);


function App() {
    // ESTADO GLOBAL DEL CARRITO
    const [cart, setCart] = useState([]); 

    // FUNCIONES DE GESTIÓN DEL CARRITO
    
    const addToCart = (productToAdd) => {
        const existingItem = cart.find(item => item.id === productToAdd.id);
        const price = Number(productToAdd.precio); 

        if (existingItem) {
            setCart(
                cart.map(item =>
                    item.id === productToAdd.id
                        ? { ...item, quantity: item.quantity + 1 } 
                        : item
                )
            );
        } else {
            setCart([...cart, { ...productToAdd, quantity: 1, precio: price }]);
        }
    };

    const removeFromCart = (productId, removeAll = false) => {
        setCart(currentCart => {
            const existingItem = currentCart.find(item => item.id === productId);
            if (!existingItem) return currentCart;

            if (removeAll || existingItem.quantity === 1) {
                return currentCart.filter(item => item.id !== productId);
            } else {
                return currentCart.map(item =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }
        });
    };
    
    const clearCart = () => {
        setCart([]);
    };

    // CÁLCULO DE VALORES
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    const totalPrice = cart.reduce(
        (total, item) => total + (item.precio * item.quantity), 
        0
    ).toFixed(2); 

    // ESTRUCTURA Y RUTAS
    return (
        <Router>
            {/* ESTRUCTURA HTML BÁSICA PARA HEADER */}
            <header className="header">
                <div className="logo-container">
                    <img src="/assets/Fotos_Hermanos_Jota/logo.svg" alt="Hermanos Jota Logo" />
                    <h1>Hermanos Jota</h1>
                </div>
                <nav className="nav-menu">
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/catalogo">Catálogo</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                        <li>
                            <Link to="/carrito" className="cart-icon">
                                Carrito ({cartItemCount})
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            
            <div style={{minHeight: '80vh'}}> 
                <Routes>
                    {/* RUTA PRINCIPAL: Ahora usa el Hero Banner, no el catálogo */}
                    <Route path="/" element={<HeroPage />} /> 
                    
                    <Route path="/catalogo" element={<main><ListaProductos /></main>} />
                    <Route path="/contacto" element={<Contacto />} />
                    
                    <Route 
                        path="/producto/:id" 
                        element={<ProductoDetalle addToCart={addToCart} />} 
                    />
                    
                    <Route 
                        path="/carrito" 
                        element={<Carrito 
                                    cart={cart}
                                    totalPrice={totalPrice} 
                                    removeFromCart={removeFromCart}
                                    clearCart={clearCart}
                                    addToCart={addToCart} 
                                />} 
                    /> 
                </Routes>
            </div>
            
            {/* ESTRUCTURA HTML BÁSICA PARA FOOTER */}
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Hermanos Jota. Todos los derechos reservados.</p>
            </footer>
        </Router>
    );
}

export default App;