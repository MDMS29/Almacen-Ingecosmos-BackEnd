import express from "express";

const PORT = process.env.PORT || 4000;

const app = express();

// Ruta de ejemplo
// app.use('/api/usuarios', usuarioRoutes);

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT} `);
});
