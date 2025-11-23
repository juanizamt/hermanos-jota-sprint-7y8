import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; 
import { CartContext } from './context/CartContext'; 
import { AuthContext } from './context/AuthContext';

const API_URL = 'http://localhost:5000/api/productos';

function ProductoDetalle() { 
    
    const { addToCart, cartItems } = useContext(CartContext); 
    const { user } = useContext(AuthContext);

    const { id } = useParams();
    const navigate = useNavigate();
    
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [mensajeVisible, setMensajeVisible] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/${id}`)
            .then(res => {
                if (!res.ok) throw new Error(`Producto no encontrado.`);
                return res.json();
            })
            .then(data => {
                setProducto(data); 
                setCargando(false);
            })
            .catch(err => {
                console.error("Error al obtener el producto:", err);
                setError("❌ No se pudo cargar el detalle del producto.");
                setCargando(false);
            });
    }, [id]);

    
    // Y usamos 'item._id' porque Mongo usa guion bajo
    const currentCartQuantity = (cartItems || []).find(item => item._id === producto?._id)?.quantity || 0;
    
    const isDisabled = (producto?.stock <= 0) || (currentCartQuantity >= producto?.stock);

    const handleAddToCart = () => {
        if (producto) {
            addToCart(producto); 
            setMensajeVisible(true);
            setTimeout(() => setMensajeVisible(false), 3000);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm(`¿Estás seguro de eliminar "${producto.nombre}"?`)) return;

        try {
            const token = localStorage.getItem('token'); 
            const response = await fetch(`${API_URL}/${producto._id}`, { 
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}` // Se envia el token
                }
            });

            if (!response.ok) throw new Error('Error al eliminar.');
            navigate('/catalogo');
        } catch (err) {
            alert(err.message);
        }
    };
    
    if (cargando) return <div className="catalogo-header">Cargando...</div>;
    if (error) return <div className="catalogo-header error-text">{error}</div>;
    if (!producto) return <div className="catalogo-header">Producto no encontrado.</div>;

    return (
        <main className="featured-products"> 
            <div className="catalogo-header"> 
                 <Link to="/catalogo" className="btn">← Volver al Catálogo</Link>
            </div>
            
            {mensajeVisible && (
                <div className="cart-confirmation-message">✅ ¡Añadido al carrito!</div>
            )}

            <div className="producto-detalle">
                <div className="image-column">
                    <img src={producto.imagenUrl || '/placeholder.jpg'} alt={producto.nombre} className="producto-detalle-imagen" />
                </div>
                
                <div className="info-column"> 
                    <h1>{producto.nombre}</h1>
                    <p className="product-detail-price">${Number(producto.precio).toLocaleString('es-AR')}</p>
                    <p className="product-detail-description">{producto.descripcion}</p>
                    <p>Stock Disponible: <strong>{producto.stock}</strong></p>
                    
                    {currentCartQuantity > 0 && 
                        <p style={{color: 'orange', fontWeight: 'bold'}}>Tienes {currentCartQuantity} en el carrito.</p>}

                    <button 
                        className="btn btn-add-to-cart-detail"
                        onClick={handleAddToCart}
                        disabled={isDisabled}
                    >
                        {producto.stock <= 0 ? 'Agotado' : (isDisabled ? 'Límite en Carrito' : 'Añadir al Carrito')}
                    </button>
                    
                    
                    {user && user.roles && user.roles.includes('admin') && (
                        <div style={{ marginTop: '30px', borderTop: '1px solid #ccc', paddingTop: '15px' }}>
                            <h4>Admin:</h4>
                            <button className="btn" style={{ backgroundColor: '#007bff', marginRight: '10px' }} onClick={() => navigate(`/admin/editar-producto/${producto._id}`)}>Editar</button>
                            <button className="btn" style={{ backgroundColor: '#dc3545' }} onClick={handleDelete}>Eliminar</button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default ProductoDetalle;