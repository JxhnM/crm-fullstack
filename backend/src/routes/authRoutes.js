const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registro
router.post('/register', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        
        const usuarioExiste = await User.findOne({ email });
        if (usuarioExiste) {
            return res.status(400).json({ mensaje: 'El usuario ya existe' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const usuario = new User({ nombre, email, password: passwordHash });
        await usuario.save();

        res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ mensaje: 'Credenciales incorrectas' });
        }

        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(400).json({ mensaje: 'Credenciales incorrectas' });
        }

        const token = jwt.sign(
            { id: usuario._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email } });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
});

module.exports = router;