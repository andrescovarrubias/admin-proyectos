const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// Creando el servidor
const app = express();

// Conectar con la db
conectarDB();

// Habilitar cors
app.use(cors());

// Habilitar express.Json
app.use(express.json({ extended: true }));

// Puerto de la app
const PORT = process.env.PORT || 5000;

// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

// Arrancar la app
app.listen(PORT, () => {
   console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});
