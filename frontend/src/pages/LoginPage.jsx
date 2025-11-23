import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function LoginPage () {

    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/usuarios/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

        const data = await response.json();

            if (response.ok) {

            login(data.token); 
            alert('Inicio de sesión exitoso.');
            navigate('/'); 
            } else {
                alert(data.message || 'Credenciales incorrectas');
            }

        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión');
        }
        };
    return (
        <main className="featured-products contact-main-padded">
            <h1 className="featured-title">Iniciar Sesión</h1>
            <form onSubmit={handleSubmit} className="contact-form" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" onChange={handleChange} required className="form-input-field" />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type="password" name="password" onChange={handleChange} required className="form-input-field" />
                </div>
                <button type="submit" className="btn btn-submit-margin">Ingresar</button>
            </form>
        </main>
    );
}

export default LoginPage;
