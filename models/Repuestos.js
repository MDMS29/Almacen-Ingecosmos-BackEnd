import mongoose from "mongoose";

const repuestoSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true,
    },
    aseguradora: {
        type: String,
        trim: true,
        required: true,
    },
    placaAuto: {
        type: String,
        trim: true,
        required: true,
    },
    cantidad: {
        type: Number,
        trim: true,
        required: true,
    },
    costo: {
        type: Number,
        trim: true,
        required: true,
    },
    estante: {
        type: String,
        trim: true,
        required: true,
    },
    fila: {
        type: Number,
        trim: true,
        required: true,
    },
},
    {
        timestamps: true
    }
)

const Repuesto = mongoose.model('Repuesto', repuestoSchema)

export default Repuesto