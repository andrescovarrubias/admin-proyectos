const express = require("express");
const conectarDB = require("./config/db");

// Creando el servidor
const app = express();

// Conectar con la db
conectarDB();

// Puerto de la app
const PORT = process.env.PORT || 4000;

// Arrancar la app
app.listen(PORT, () => {
  console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});
