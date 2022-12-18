import express from 'express';
import {
    prueba,
    registrar,
    actualizar,
    eliminar,
    filtrar,
    salida
} from '../controllers/insumosController.js';


const router = express.Router();

// Rutas Publicas
router.get('/prueba', prueba);
router.post('/', registrar);
router.route('/:id').put(actualizar).delete(eliminar);
router.post('/filtrar', filtrar);
router.post('/salida', salida);

export default router;