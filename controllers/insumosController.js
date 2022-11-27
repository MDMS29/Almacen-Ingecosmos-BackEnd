import Insumo from "../models/insumo.js";


const prueba = (req, res) => {
    res.send({
        msg: "En esta ruta gestionaremos todas las perticiones de los insumos"
    })
};

const registrar = async (req, res) => {

    const { nombre, descripcion, stock, posicion, estante, fila } = req.body;
    // Validar usuario duplicado
    // findOne busca por los diferentes atributos de la coleccion
    const existeInsumo = await Insumo.findOne({nombre});
    if (existeInsumo) {
        const error = new Error("Insumo ya registrado");
        return res.status(400).json({ msg: error.message });
    };
    try {
        const insumo = new Insumo(req.body);
        const insumoGuardado = await insumo.save();
        // Enviar el email
        // emailRegistro({
        //     nombre,
        //     token: insumoGuardado.token
        // });
        res.json(insumoGuardado);
    } catch (error) {
        console.error(error.message);
    };
};


export {
    prueba,
    registrar
};