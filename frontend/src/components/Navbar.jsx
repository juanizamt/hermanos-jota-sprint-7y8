import React, { useContext } from 'react';

import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext'; 
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();      
    navigate('/'); 
  };

  return (
    <header className="header">
      <Link to="/" className="logo-container">
        
        <img src="/assets/Fotos_hermanos_jota/logo.svg" alt="Logo" style={{ height: '60px' }} />
        <h1>Mueblería Hermanos Jota</h1>
      </Link>
      
      <nav className="nav-menu">
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/catalogo">Catálogo</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>

        {user && user.roles && user.roles.includes('admin') && (
          <li>
             <Link to="/admin/crear-producto" className="nav-link-style" style={{color: '#e67e22'}}>
                    ★ Crear Producto
              </Link>
           </li>
          )}

         
          {user ? (
            <>
              <li>
                  <span className="user-welcome">Hola, {user.username}</span>
              </li>
              
              
              <li>
                  <button onClick={handleLogout} className="btn-logout">
                      Salir
                  </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="nav-link-style">Ingresar</Link></li>
              <li><Link to="/registro" className="nav-link-style">Registrarse</Link></li>
            </>
          )}

          <li>
            <Link to="/carrito" className="cart-icon" title={`Carrito: ${cartCount} items`}>
                🛒 <span id="cart-counter">{cartCount}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;