import express from "express";

import { mostrarHistorial } from "../controllers/historialController.js";

const router = express.Router()

router.get('/historialInsumos', mostrarHistorial)

export default router