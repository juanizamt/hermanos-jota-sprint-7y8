// frontend/src/ListaProductos.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

function ListaProductos() {
    // ESTADOS
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); 

    // EFECTO DE CARGA DE DATOS
    useEffect(() => {
        const API_URL = 'http://localhost:3001/api/productos';

        fetch(API_URL)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Error HTTP: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                setProductos(data);
                setCargando(false);
            })
            .catch(err => {
                console.error("No se pudo conectar al backend:", err);
                
                setError("❌ Error: No se pudo obtener la lista de productos. Asegúrate que el servidor de Express esté corriendo en el puerto 3001."); 
                setCargando(false);
            });
    }, []); 
    
    
    // LÓGICA DE FILTRADO (¡CÓDIGO CLAVE!)
    const filteredProducts = productos.filter(producto =>
        // Convierte tanto el nombre como el término de búsqueda a minúsculas para hacer el filtrado insensible a mayúsculas/minúsculas
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );


    // RENDERIZADO DE ESTADOS
    if (cargando) {
        return <div className="catalogo-header">Cargando productos...</div>;
    }

    if (error) {
        return <div className="catalogo-header error-text">{error}</div>; 
    }
    
    
    // RENDERIZADO DEL CATÁLOGO
    return (
        <main className="featured-products">
            <h1 className="featured-title">Nuestro Catálogo</h1>

            {/*BARRA DE BÚSQUEDA */}
            <div className="search-bar-container">
                <input
                    type="text"
                    placeholder="Buscar productos por nombre..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // El cambio actualiza el estado de búsqueda
                />
            </div>
            
            {/* Mensaje si no se encuentran resultados */}
            {filteredProducts.length === 0 && productos.length > 0 && (
                <div className="catalogo-header">
                    No se encontraron productos que coincidan con "{searchTerm}".
                </div>
            )}
            
            {/* Renderizar los productos FILTRADOS */}
            <div className="products-container">
                {filteredProducts.map(producto => (
                    <Link 
                        key={producto.id} 
                        to={`/producto/${producto.id}`} 
                        className="product-card product-link"
                    >
                        
                        <img 
                            src={producto.imagen || 'placeholder.jpg'} 
                            alt={producto.nombre} 
                            className="product-card-image"
                        />
                        
                        <div className="product-card-info">
                            <h2>{producto.nombre}</h2>
                            <p className="product-price">
                                ${producto.precio ? producto.precio.toLocaleString('es-AR') : 'N/A'}
                            </p>
                            
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}

export default ListaProductos;