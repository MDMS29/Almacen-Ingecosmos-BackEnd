import {  
    login,
    mostrarRepuestos,
    nuevoRepuesto,
    editarRepuesto,
    salidaRepuesto 
} from '../controller/almacenistaController.js';

import express from 'express';

const router = express.Router()

router.get('/', login)
router.get('/repuestos', mostrarRepuestos)
router.get('/nuevo-repuesto', nuevoRepuesto)
router.get('/editar-repuesto', editarRepuesto)
router.get('/salida-repuesto', salidaRepuesto)

export default router