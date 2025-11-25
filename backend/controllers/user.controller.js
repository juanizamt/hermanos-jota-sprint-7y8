//user.controller.js

import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Validar si existe
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'El nombre de usuario o correo electrónico ya está en uso.' });
        }

        // hasheo de contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear usuario
        const nuevoUsuario = new User({
            username,
            password: hashedPassword,
            email,
            roles: ['cliente'] 
        });

        const savedUser = await nuevoUsuario.save();
        // Crear token JWT
        const token = jwt.sign(
            { 
                userId: savedUser._id, 
                username: savedUser.username,
                roles: savedUser.roles 
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // devuelve el token y el usuario
        res.status(201).json({
            token, 
            user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
                roles: savedUser.roles
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el usuario.', error: error.message });
    }
};

export const loginUser = async (req,res) => {

    try {

        const { password, email } = req.body;

        const user = await User.findOne({ email });    
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas.' });
        }   

    const contraseniaValida = await bcrypt.compare(password, user.password);
    if (!contraseniaValida) {
        return res.status(400).json({ message: 'Credenciales inválidas.' });    
    }

    const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } 
    );

    res.status(200).json({ token,

        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            roles: user.roles

        }


     });

} catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión.', error: error.message });
}





};