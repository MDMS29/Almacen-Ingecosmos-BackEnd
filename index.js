import express from "express";
import dotenv from "dotenv";

const PORT = process.env.PORT || 4000;

const app = express();
dotenv.config();

// Ruta de ejemplo
// app.use('/api/usuarios', usuarioRoutes);

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT} `);
});
