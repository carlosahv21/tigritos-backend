// server.js
require('dotenv').config(); // Carga las variables de entorno
const express = require('express');
const cors = require('cors');

// Crear la aplicación Express
const app = express();

// Middlewares
app.use(cors()); // Permite solicitudes desde cualquier origen (ajusta en producción)
app.use(express.json()); // Parsea el cuerpo de las solicitudes como JSON

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: '¡Bienvenido a la API de Tigritos!' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});