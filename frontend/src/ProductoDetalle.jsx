// frontend/src/ProductoDetalle.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductoDetalle({ addToCart }) { 
    const { id } = useParams(); 
    
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    
    const [mensajeVisible, setMensajeVisible] = useState(false);

    useEffect(() => {
        const API_URL = `http://localhost:3001/api/productos/${id}`;

        fetch(API_URL)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Producto no encontrado o error HTTP: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                setProducto({ ...data, id: id }); 
                setCargando(false);
            })
            .catch(err => {
                console.error("Error al obtener el producto:", err);
                setError("❌ No se pudo cargar el detalle del producto.");
                setCargando(false);
            });
    }, [id]); 
    
    const handleAddToCart = () => {
        if (producto) {
            addToCart(producto); 
            setMensajeVisible(true);
            
            setTimeout(() => {
                setMensajeVisible(false);
            }, 3000);
        }
    };
    
    // ------------------- Renderizado de estados -------------------
    
    if (cargando) {
        return <main className="featured-products"><div className="catalogo-header">Cargando detalles...</div></main>;
    }

    if (error) {
        return <main className="featured-products"><div className="catalogo-header" style={{ color: 'red' }}>{error}</div></main>;
    }
    
    if (!producto) {
        return <main className="featured-products"><div className="catalogo-header">Producto no encontrado.</div></main>;
    }


    // ------------------- Renderizado del producto -------------------
    return (
        <main className="featured-products"> 
            {/* 🚨 Usamos la nueva clase para el contenedor del botón */}
            <div className="catalogo-header catalogo-header-flex"> 
                 <Link to="/catalogo" className="btn">
                    ← Volver al Catálogo
                 </Link>
            </div>
            
            {mensajeVisible && (
                <div className="cart-confirmation-message">
                    ✅ ¡**{producto.nombre}** añadido al carrito!
                </div>
            )}
            

            {/* Contenedor de Detalle (sin estilos en línea) */}
            <div className="producto-detalle">
                
                <div className="image-column">
                    <img 
                        src={producto.imagen || '/assets/Fotos_Hermanos_Jota/placeholder.jpg'} 
                        alt={producto.nombre} 
                        className="producto-detalle-imagen" 
                    />
                </div>
                
                <div className="info-column"> 
                    {/* El estilo del h1 ya está en tu CSS principal */}
                    <h1>{producto.nombre}</h1>
                    
                    {/* 🚨 Clase añadida aquí */}
                    <p className="product-detail-price">
                        $ {producto.precio ? producto.precio.toLocaleString('es-AR') : 'Precio no disponible'}
                    </p>
                    
                    {/* 🚨 Clase añadida aquí */}
                    <p className="product-detail-description">
                        {producto.descripcion || 'Descripción detallada del producto no disponible.'}
                    </p>
                    
                    {/* Botón para Carrito */}
                    <button 
                        className="btn btn-add-to-cart-detail" // 🚨 Clase añadida aquí
                        onClick={handleAddToCart}
                    >
                        Añadir al Carrito
                    </button>
                    
                </div>
            </div>
        </main>
    );
}

export default ProductoDetalle;