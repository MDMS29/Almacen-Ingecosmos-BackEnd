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
    const existeInsumo = await Insumo.findOne({ nombre });
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

const actualizar = async (req, res) => {
    try {
        const actualizarInsumos = await Insumo.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true,
            }
        );
        return res.send(actualizarInsumos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const eliminar = async (req, res) => {
    try {
        const eliminarInsumo = await Insumo.findByIdAndDelete(req.params.id); 
        if (!eliminarInsumo) {
            const error = new Error("Token no valido");
            return res.sendStatus(404);
        } else {
            return res.sendStatus(204);
        }

        res.send({
            msg: "Insumo eliminado correctamente"
        })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export {
    prueba,
    registrar,
    actualizar,
    eliminar
};