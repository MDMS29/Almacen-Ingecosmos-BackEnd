import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";

const PORT = process.env.PORT || 4000;

const app = express();
dotenv.config();
conectarDB();

// Ruta de ejemplo
// app.use('/api/usuarios', usuarioRoutes);

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT} `);
});
