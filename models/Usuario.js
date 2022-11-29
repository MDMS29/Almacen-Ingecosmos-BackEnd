import mongoose from 'mongoose';

import bcrypt from 'bcrypt';
import generarId from '../helpers/generarId.js';

const usuarioShema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    tipoDocumento:{
        type: String,
        required: true,
        trim: true,
    },
    numeroDocumento:{
        type: Number,
        required: true,
        unique: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
    },
    telefono:{
        type: Number,
        default: null,
        trim: true,
    },
    direccion:{
        type: String,
        default: null,
        trim: true,
    },
    token:{
        type: String,
        default: generarId(),
    },
    rol:{
        type: String,
        default: null,
        trim: true,
    }
},
{
    timestamps: true
}
);

usuarioShema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next();
    };
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
}); 

usuarioShema.methods.comprobarPassword = async function(passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password);
};

const Usuario = mongoose.model('Usuario', usuarioShema);
export default Usuario;