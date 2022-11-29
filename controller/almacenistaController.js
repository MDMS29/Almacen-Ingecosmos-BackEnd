import Repuesto from "../models/Repuestos.js";

const nuevoRepuesto = async (req, res) => {
    const { nombre, aseguradora, placaAuto, cantidad, costo } = req.body;
    const existeUsuario = await Repuesto.find({ nombre }).where({ placaAuto })

    if (existeUsuario.length !== 0) {
        const id = existeUsuario[0]._id.toString()

        const repuesto = await Repuesto.findById(id)

        if (!repuesto) {
            const error = new Error("No se encontro repuesto!")
            return res.status(404).json({ msg: error.message })
        }

        repuesto.cantidad = repuesto.cantidad + cantidad || repuesto.cantidad

        try {
            const repuestoAlmacenado = await repuesto.save()
            res.json(repuestoAlmacenado)
        } catch (error) {
            console.log(error)
        }
        return
    }

    try {
        //Crea una instancia de usuario para insertar.
        const repuesto = new Repuesto(req.body)
        await repuesto.save()
        res.json({ msg: "¡Repuesto guardado correctamente!" });
    } catch (error) {
        console.log(error);
    }
}

const mostrarRepuestos = async (req, res) => {
    const repuestos = await Repuesto.find()
    res.json(repuestos)
}

const filtrarRepuestos = async (req, res) => {
    const { nombre, aseguradora, placaAuto, estante, fila } = req.body

    var respuesta

    if (nombre) respuesta = await Repuesto.find({ nombre: { $regex: nombre } })
    else if (aseguradora) respuesta = await Repuesto.find({ aseguradora: { $regex: aseguradora } })
    else if (placaAuto) respuesta = await Repuesto.find().where('placaAuto').equals(placaAuto)
    else if (estante) respuesta = await Repuesto.find().where('estante').equals(estante)
    else if (fila) respuesta = await Repuesto.find().where('fila').equals(fila)
    else respuesta = "¡No se encontraron repuestos!"

    return res.json(respuesta)
}

const obtenerRepuesto = async (req, res) => {
    const { id } = req.params

    //Buscar el repuesto por su id
    const repuesto = await Repuesto.findById(id).select("-createdAt -updatedAt -__v")

    if (!repuesto) {
        const error = new Error("¡Repuesto no encontrado!")
        return res.status(404).json({ msg: error.message })
    }

    res.json(repuesto)
}

const editarRepuesto = async (req, res) => {
    const { id } = req.params

    //Buscar el proyecto por su id
    const repuesto = await Repuesto.findById(id)


    if (!repuesto) {
        const error = new Error("¡Repuesto no encontrado!")
        return res.status(404).json({ msg: error.message })
    }

    repuesto.nombre = req.body.nombre || repuesto.nombre
    repuesto.aseguradora = req.body.aseguradora || repuesto.aseguradora
    repuesto.placaAuto = req.body.placaAuto || repuesto.placaAuto
    repuesto.cantidad = req.body.cantidad || repuesto.cantidad
    repuesto.costo = req.body.costo || repuesto.costo
    repuesto.estante = req.body.estante || repuesto.estante
    repuesto.fila = req.body.fila || repuesto.fila

    try {
        const repuestoAlmacenado = await repuesto.save()
        res.json(repuestoAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

const salidaRepuesto = async (req, res) => {
    const { id } = req.params

    //Buscar el proyecto por su id
    const repuesto = await Repuesto.findById(id).select("cantidad")

    if (!repuesto) {
        const error = new Error("¡Repuesto no encontrado!")
        return res.status(404).json({ msg: error.message })
    }

    if (repuesto.cantidad == req.body.cantidad) {
        repuesto.cantidad = 0
        if (repuesto.cantidad == 0) {
            await repuesto.deleteOne()
            res.json({ msg: "¡Repuesto Eliminado!" })
        }
        return
    }

    repuesto.cantidad = repuesto.cantidad - req.body.cantidad || repuesto.cantidad

    try {
        const repuestoAlmacenado = await repuesto.save()
        res.json(repuestoAlmacenado)

    } catch (error) {
        console.log(error)
    }
}

export {
    mostrarRepuestos,
    filtrarRepuestos,
    nuevoRepuesto,
    obtenerRepuesto,
    editarRepuesto,
    salidaRepuesto
}