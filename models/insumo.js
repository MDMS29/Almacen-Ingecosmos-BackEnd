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
    descripcion: {
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
        type: String,
        required: true,
        trim: true,
    }
});
// Antes de guardar el usuario Hashear el password
// https://www.npmjs.com/package/bcryptjs
// https://www.npmjs.com/package/bcrypt
insumoShema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    };
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
// Confirmar password del usuario, esta funcion devuelve verdadero o falso
insumoShema.methods.comprobarPassword = async function (passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password);
};
const Insumo = mongoose.model('Insumo', insumoShema);
export default Insumo;