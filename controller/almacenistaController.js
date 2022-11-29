import Repuesto from "../models/Repuestos.js";

const mostrarRepuestos = () => { }

const nuevoRepuesto = async (req, res) => {
    const { nombre, placaAuto, cantidad, costo } = req.body;
    const existeUsuario = await Repuesto.find({ nombre }).where({placaAuto})

    if (existeUsuario.length !== 0) {
        const id = existeUsuario[0]._id.toString()

        const repuesto = await Repuesto.findById(id)

        if (!repuesto) {
            const error = new Error("No se encontro repuesto!")
            return res.status(404).json({ msg: error.message })
        }

        repuesto.cantidad = repuesto.cantidad + cantidad || repuesto.cantidad
        repuesto.costo = repuesto.costo + costo || repuesto.costo
    
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

const editarRepuesto = () => { }

const salidaRepuesto = () => { }

export {
    mostrarRepuestos,
    nuevoRepuesto,
    editarRepuesto,
    salidaRepuesto
}