//RegistroPage.jsx

import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import { useNavigate } from 'react-router-dom';

function RegistroPage() {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/usuarios/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            //console.log("respuesta del servidor:", data);

            if (response.ok) {
                login(data.token);
                alert(`¡Bienvenido, ${data.user.username}! Registro exitoso.`);
                navigate('/');
            } else {
                alert(data.message || 'Error al registrarse');
            }
        } catch (error) {
            console.error('Error durante el registro:', error);
            alert('Error al registrarse. Inténtalo de nuevo más tarde.');
        }
    };

    return (
        <main className="featured-products contact-main-padded">
            <h1 className = "featured-title"> Crear Cuenta </h1>
            <form onSubmit={handleSubmit} className="contact-form" style={{ maxWidth: '400px', margin: '0 auto' }}>
                <div>
                    <label>Nombre de Usuario:</label>
                    <input type = "text" name = "username" onChange = {handleChange} required className = "form-input-field"/>
                </div>
                <div>
                    <label>Email:</label>
                    <input type = "email" name = "email" onChange = {handleChange} required className = "form-input-field"/>
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type = "password" name = "password" onChange = {handleChange} required className = "form-input-field"/>
                </div>

                <button type="submit" className="btn btn-primary btn-block mt-3">Registrarse</button>


            </form>
        </main>

    );}

    export default RegistroPage;