import { 
    mostrarRepuestos,
    nuevoRepuesto,
    editarRepuesto,
    salidaRepuesto 
} from '../controller/almacenistaController.js';

import express from 'express';
import checkout from '../middleware/checkout.js';

const router = express.Router()

router.route('/')
    .get(checkout, mostrarRepuestos)
    .post(checkout, nuevoRepuesto)
// router.get('/editar-repuesto', checkout, editarRepuesto)
// router.get('/salida-repuesto', checkout, salidaRepuesto)

export default router