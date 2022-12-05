import { 
    mostrarRepuestos,
    filtrarRepuestos,
    nuevoRepuesto,
    obtenerRepuesto,
    editarRepuesto,
    salidaRepuesto 
} from '../controller/almacenistaController.js';

import express from 'express';
import checkout from '../middleware/checkout.js';
import { get } from 'mongoose';

const router = express.Router()

router.route('/')
    .get(checkout, mostrarRepuestos)
    .post(checkout, nuevoRepuesto)

router.post('/filtrar-repuestos', checkout, filtrarRepuestos)

router.route('/repuesto/:id')
    .get(checkout, obtenerRepuesto)
    .put(checkout, editarRepuesto)

router.post('/repuesto/salida',checkout, salidaRepuesto)

// router.get('/salida-repuesto', checkout, salidaRepuesto)

export default router