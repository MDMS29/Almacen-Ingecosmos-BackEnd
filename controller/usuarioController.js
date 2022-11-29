import Usuario from "../models/Usuario.js"
import generarId from "../helpers/generarId.js"
import generarJWT from "../helpers/generarJWT.js"

const login = async (req, res) => {
    const { numeroDocumento, password } = req.body
    //Comprobar si el usuario existe.
    //Busca usuario que contenga el mismo correo
    const usuario = await Usuario.findOne({ numeroDocumento })

    if (!usuario) {
        const error = new Error('El Usuario no existe!')
        return res.status(400).json({ msg: error.message })
    }

    //Comprobar password.
    //Metodo creado en el Modelo "Usuario.js"
    if (await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario.id), //Enviamos el id para generar un JWT.
        })
    } else {
        const error = new Error('¡La contraseña es incorrecta!')
        return res.status(403).json({ msg: error.message })
    }

}

const registrar = async (req, res) => {
    //Evitar registros duplicados
    const { numeroDocumento, email } = req.body;
    const existeUsuario = await Usuario.findOne({ numeroDocumento } || { email })

    if (existeUsuario) {
        const error = new Error('Personal ya registrado')
        return res.status(400).json({ msg: error.message })
    }

    try {
        //Crea una instancia de usuario para insertar.
        const usuario = new Usuario(req.body)
        usuario.token = generarId()
        await usuario.save()
        res.json({ msg: "¡Personal registrado correctamente!" });//Respuesta enviada
    } catch (error) {
        console.log(error);
    }
}

const perfil = async (req, res) => {
    const { usuario } = req
    res.json(usuario)
}

export {
    login,
    registrar,
    perfil
}