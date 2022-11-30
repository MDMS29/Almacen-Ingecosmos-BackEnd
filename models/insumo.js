import mongoose from 'mongoose';
//https://www.npmjs.com/package/bcryptjs
//https://www.npmjs.com/package/bcrypt
import bcrypt from 'bcrypt';
import generarId from '../helper/generarId.js';

const insumoShema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    tipo: {
        type: String,
        required: true,
        trim: true,
    },
    stock: {
        type: Number,
        required: true,
        trim: true,
    },
    costo: {
        type: Number,
        required: true,
        trim: true,
    },
    estante: {
        type: String,
        required: true,
        trim: true,
    },
    fila: {
        type: Number,
        required: true,
        trim: true,
    },
    estadoVenta: {
        type: Boolean,
        default: false, //No esta escaso (false) 
    }
},
    {
        timestamp: true
    }
);

const Insumo = mongoose.model('Insumo', insumoShema);
export default Insumo;