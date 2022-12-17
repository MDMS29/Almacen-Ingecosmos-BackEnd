import express from "express";
import checkout from "../middleware/checkout.js";

import { mostrarHistorialRepuestos } from "../controller/historialController.js";

const router = express.Router()

router.get('/historialRepuestos', checkout, mostrarHistorialRepuestos)

export default router