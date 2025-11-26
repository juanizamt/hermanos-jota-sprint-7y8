// frontend/src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import ListaProductos from './ListaProductos.jsx';
import ProductoDetalle from './ProductoDetalle.jsx';
import Carrito from './Carrito.jsx'; 
import Contacto from './Contacto.jsx'; 
import ProductForm from './ProductForm';
import './App.css'; 
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegistroPage.jsx';
import Navbar from './components/Navbar.jsx';

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

const CatalogWrapper = () => {
    const location = useLocation();
    const successMessage = location.state?.successMessage;

    return (
        <main>
            {successMessage && (
                <div className="cart-confirmation-message" style={{position: 'static', transform: 'none', margin: '20px auto', width: 'fit-content'}}>
                    {successMessage}
                </div>
            )}
            <ListaProductos />
        </main>
    );
};



function App() {
    
    const [cart, setCart] = useState([]); 
    const [notification, setNotification] = useState(null);
    
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);
    
    const addToCart = (productToAdd) => { 
        
        const existingItem = cart.find(item => item.id === productToAdd._id);
        const price = Number(productToAdd.precio); 

        if (existingItem && existingItem.quantity >= currentStock) {
            setNotification({
                message: `¡Stock límite alcanzado! Solo quedan ${currentStock} unidades de ${productToAdd.nombre}.`,
                type: 'error'
            });
            return; 
        }
        if (existingItem) {
            setCart(cart.map(item =>
                item.id === productToAdd._id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...productToAdd, quantity: 1, id: productToAdd._id, precio: price }]);
        }
        
        setNotification({ message: `Añadido: ${productToAdd.nombre}`, type: 'success' });
    };

    const removeFromCart = (productId, removeAll = false) => {
       
        const itemToRemove = cart.find(item => item.id === productId);
        
        if (itemToRemove) {
            if (removeAll || itemToRemove.quantity === 1) {
                
                setNotification({ 
                    message: `${itemToRemove.nombre} eliminado del carrito.`, 
                    type: 'error' 
                });
            } else {
                
                setNotification({ 
                    message: `Se restó 1 unidad de ${itemToRemove.nombre}.`, 
                    type: 'neutral'
            });
        }
    };
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
        // Mensaje ROJO al vaciar todo
        setNotification({ 
            message: 'Has vaciado tu carrito.', 
            type: 'error' 
        });
    };

    
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce( (total, item) => total + (item.precio * item.quantity), 0 ).toFixed(2); 

    
    return (
        <div style={{minHeight: '80vh', position: 'relative'}}> 

            <Navbar /> 
            {notification && notification.message &&(
                <div className={`notification-toast ${notification.type}`}>
                    {notification.message}
                </div>
            )}            

            <Routes>
                <Route path="/" element={<HeroPage />} />
                <Route path="/catalogo" element={<ListaProductos />} /> 
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/login" element={<LoginPage setNotification={setNotification} />} />
                <Route path="/registro" element={<RegisterPage setNotification={setNotification} />} />
                
                <Route path="/admin/crear-producto" element={<ProductForm />} /> 
                <Route path="/admin/editar-producto/:id" element={<ProductForm />} /> 
                <Route path="/productos/:id" element={<ProductoDetalle />} />
                <Route path="/carrito" element={<Carrito />} /> 
            </Routes>
            
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Hermanos Jota. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}

export default App;