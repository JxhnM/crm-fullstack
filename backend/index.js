require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const productosRoutes = require('./src/routes/productosRoutes');
const stakeholderRoutes = require('./src/routes/stakeholderRoutes');

const app = express();

// Conectar base de datos
conectarDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ mensaje: 'Servidor funcionando correctamente' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});