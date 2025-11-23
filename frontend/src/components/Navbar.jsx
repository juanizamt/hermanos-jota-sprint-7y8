import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext'; 

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext); 

  return (
    <header className="header">
      <div className="logo-container">
        <img src="/assets/Fotos_hermanos_jota/logo.svg" alt="Logo" style={{ height: '60px' }} />
        <h1>Mueblería Hermanos Jota</h1>
      </div>
      <nav className="nav-menu">
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/catalogo">Catálogo</Link></li>
          
          
          {user ? (
            <>
                <li><span style={{color: 'white', fontWeight:'bold'}}>Hola, {user.username}</span></li>
                
                {user.rol && user.rol.includes('admin') && (
                   <li><Link to="/admin/crear-producto" style={{color: '#ff6b6b'}}>Admin</Link></li>
                )}
                <li><button onClick={logout} className="btn-logout" style={{background:'transparent', border:'none', color:'white', cursor:'pointer'}}>Salir</button></li>
            </>
          ) : (
            <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/registro">Registro</Link></li>
            </>
          )}

          <li><Link to="/contacto">Contacto</Link></li>
          
          <li>
            <Link to="/carrito" className="cart-icon">
                🛒 <span>{cartCount}</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;