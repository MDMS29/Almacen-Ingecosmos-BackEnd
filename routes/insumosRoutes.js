import express from 'express';
import {
    prueba,
    registrar,
    actualizar,
    eliminar
} from '../controllers/insumosController.js';


const router = express.Router();

// Rutas Publicas
router.get('/prueba', prueba);
router.post('/', registrar);
router.put('/:id', actualizar);
router.delete('/:id', eliminar);

export default router;