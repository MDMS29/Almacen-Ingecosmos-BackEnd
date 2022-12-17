import express from "express";
import dotenv from 'dotenv';

import conectarDB from './config/db.js';
import almacenistaRoutes from './routes/almacenistaRoutes.js'
import usuarioRoutes from './routes/usuarioRoutes.js';
import historialRoutes from './routes/historialRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());

conectarDB()

// Ruta de ejemplo
app.use('/administrador', usuarioRoutes);

app.use('/almacen', almacenistaRoutes);

app.use('/historial', historialRoutes);

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT} `);
});
