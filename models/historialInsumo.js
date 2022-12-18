import mongoose from "mongoose";

const historialInsumoSchema = mongoose.Schema({
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
            ref: 'Insumo'
        }
    ],
    cantidadS: [
        {
            type: Number,
            trim: true
        }
    ],
    totalSalida: {
        type: Number,
        trim: true,
        // required: true,
    },
    fecha: {
        type: Date,
        default: Date.now(),
    }
}
)

const HistorialInsumo = mongoose.model('historialInsumo', historialInsumoSchema)

export default HistorialInsumo