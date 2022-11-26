import express from "express";
import dotenv from 'dotenv';

import conectarDB from './config/db.js';
import almacenistaRouter from './routes/almacenistaRoutes.js'

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());

conectarDB()

// Ruta de ejemplo
app.use('/ingecosmos', almacenistaRouter);

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT} `);
});
