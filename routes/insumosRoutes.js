import express from 'express';
import {
    prueba,
    registrar,
    actualizar,
    eliminar,
    filtrar
} from '../controllers/insumosController.js';


const router = express.Router();

// Rutas Publicas
router.get('/prueba', prueba);
router.post('/', registrar);
router.put('/:id', actualizar);
router.delete('/:id', eliminar);
router.post('/f', filtrar);

export default router;