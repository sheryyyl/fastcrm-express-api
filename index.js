const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importar cors
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para CORS
app.use(cors({
    origin: 'http://localhost:5173' // Permitir solicitudes desde este origen
}));

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a MongoDB Atlas');
}).catch(err => {
    console.error('Error al conectar a MongoDB Atlas:', err);
});

// Rutas
const templateRoutes = require('./routes/templateRoutes');
app.use('/templates', templateRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});