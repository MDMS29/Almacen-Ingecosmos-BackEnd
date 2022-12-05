import mongoose from "mongoose";

const historialSchema = mongoose.Schema({
    tipo : {
        type: String,
        required: true,
        enum : ['Entrada', 'Salida'],
    },
    nombreSalida: {
        type: String,
        trim: true,
    },
    repuestoSalida: [ //Corchetes para indicar que habrá varios
        {
            type: Object,
            ref: 'Repuesto',
        }
    ],
    totalSalida: {
        type: Number,
        trim: true,
        required: true,
    },
    fecha: {
        type: Date,
        default: Date.now(),
    }
}
)

const Historial = mongoose.model('Historial', historialSchema)

export default Historial