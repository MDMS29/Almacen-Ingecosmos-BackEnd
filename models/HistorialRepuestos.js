import mongoose from "mongoose";

const historialRepuestosSchema = mongoose.Schema({
    tipo : {
        type: String,
        required: true,
        enum : ['Entrada', 'Salida'],
    },
    nombreSalida: {
        type: String,
        trim: true,
    },
    articulos: [ //Corchetes para indicar que habrá varios
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Repuesto',
        }
    ],
    totalSalida: {
        type: Number,
        trim: true,
    },
    fecha: {
        type: Date,
        default: Date.now(),
    }
}
)

const HistorialRepuestos = mongoose.model('HistorialRepuestos', historialRepuestosSchema)

export default HistorialRepuestos
