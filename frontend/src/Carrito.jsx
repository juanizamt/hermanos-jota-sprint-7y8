// frontend/src/Carrito.jsx

import React, { useState, useContext } from 'react'; 
import { Link } from 'react-router-dom';
import { CartContext } from './context/CartContext'; 
import { AuthContext } from './context/AuthContext'; 
import './App.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Carrito() { 

    const { 
        cartItems: cart, 
        cartTotal: totalPrice, 
        removeFromCart, 
        clearCart, 
        addToCart 
    } = useContext(CartContext);

    const [compraExitosa, setCompraExitosa] = useState(false);

    const handleCheckout = async () => {
        if (cart.length === 0) return; 

        
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Debes iniciar sesión para finalizar la compra.");
            return;
        }

        const API_URL_STOCK = `${API_BASE}/productos/update-stock`;
        
        const itemsToUpdate = cart.map(item => ({
            id: item._id || item.id, // Aseguramos compatibilidad con _id de Mongo
            quantity: item.quantity
        }));

        try {
            const response = await fetch(API_URL_STOCK, {
                method: 'PATCH', 
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({ items: itemsToUpdate }) 
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al procesar la compra.');
            }
            
            setCompraExitosa(true);
            
            setTimeout(() => {
                clearCart();
                setCompraExitosa(false); 
            }, 3000);

        } catch (error) {
            window.alert(`Error al finalizar la compra: ${error.message}`); 
            setCompraExitosa(false); 
        }
    };
    // ------------------- Renderizado -------------------
    if (compraExitosa) {
        return (
            <main className="cart-empty-state">
                <div className="cart-confirmation-message cart-confirmation-message-static"> 
                   ¡Gracias por tu compra! El pedido ha sido procesado con éxito.
                </div>
                <h2>🛒 Carrito de Compras</h2>
                <hr />
                <p className="cart-empty-state-margin-top">Tu carrito está ahora vacío.</p>
                <Link to="/catalogo" className="btn cart-empty-state-margin-top">
                    Seguir Comprando
                </Link>
            </main>
        );
    }

    if (cart.length === 0) { 
        return (
            <main className="cart-empty-state">
                <h2>🛒 Carrito de Compras</h2>
                <hr />
                <p>Tu carrito está vacío. ¡Empieza a llenarlo con nuestros increíbles productos!</p>
                <Link to="/catalogo" className="btn cart-empty-state-margin-top">
                    Ver Catálogo
                </Link>
            </main>
        );
    }

    // ------------------- Renderizado de Carrito Lleno -------------------

    return (
        <main className="cart-main-padded">
            <h2>🛒 Tu Carrito</h2>
            <hr />

            <div className="cart-columns"> 
                
                <div className="cart-items cart-items-column">
                    {cart.map(item => (
                        <div key={item._id || item.id} className="cart-item">
                            <img 
                                src={item.imagenUrl || item.imagen} 
                                alt={item.nombre} 
                                className="cart-item-image"
                            />
                            <div className="cart-item-info">
                                <h4>{item.nombre}</h4>
                                <p>Cantidad: <strong>{item.quantity}</strong></p>
                                
                                <div className="qty-controls-wrapper">
                                    <button 
                                        onClick={() => addToCart(item)} 
                                        className="btn-qty-control">+</button>
                                     
                                    <button 
                                        onClick={() => removeFromCart(item._id || item.id)} 
                                        className="btn-qty-control">-</button>
                                        
                                    <button
                                        onClick={() => removeFromCart(item._id || item.id, true)} 
                                        className="btn-remove-item">
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                            <div className="cart-item-price">
                                <p className="cart-item-price-total"> 
                                    $ {(item.precio * item.quantity).toFixed(2)}
                                </p>
                                <p className="cart-item-price-unit">($ {Number(item.precio).toFixed(2)} c/u)</p>
                            </div>
                        </div>
                    ))}
                    
                    <button onClick={clearCart} className="btn-clear-cart">
                        Vaciar Carrito
                    </button>
                </div>

                <div className="cart-summary">
                    <h3>Resumen del Pedido</h3>
                    <hr />
                    <div className="cart-total-row">
                        <p>Subtotal ({cart.reduce((total, item) => total + item.quantity, 0)} productos):</p>
                        <p>${Number(totalPrice).toFixed(2)}</p>
                    </div>
                    
                    <div className="cart-total-row cart-total-row-no-border">
                        <h4>Total a Pagar:</h4>
                        <h4 className="cart-final-total-color">$ {Number(totalPrice).toFixed(2)}</h4>
                    </div>
                    
                    <button 
                        className="btn btn-checkout" 
                        onClick={handleCheckout} 
                    >
                        Finalizar Compra
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Carrito;