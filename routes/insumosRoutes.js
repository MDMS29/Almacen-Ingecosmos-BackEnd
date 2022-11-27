import express from 'express';
import {
    prueba,
    registrar
} from '../controllers/insumosController.js';


const router = express.Router();

// Rutas Publicas
router.get('/prueba', prueba);
router.post('/', registrar);

export default router;