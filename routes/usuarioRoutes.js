import express from "express";

const router = express.Router();

import {
    login,
    registrar,
    perfil
} from '../controller/usuarioController.js'

import checkout from '../middleware/checkout.js'

router.post('/registrar', registrar)

router.post('/', login)

router.get('/perfil', checkout, perfil)

export default router