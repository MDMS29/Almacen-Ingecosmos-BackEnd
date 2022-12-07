import Insumo from "../models/insumo.js";
import { guardarHistorial } from "./historialController.js";

const prueba = (req, res) => {
    res.send({
        msg: "En esta ruta gestionaremos todas las perticiones de los insumos"
    })
};

// const registrar = async (req, res) => {

//     const { nombre, stock, tipo } = req.body;
//     // Validar usuario duplicado
//     // findOne busca por los diferentes atributos de la coleccion
//     const existeInsumo = await Insumo.findOne({ nombre }).where({tipo});

//     if (existeInsumo) {
//          const id = existeInsumo._id
       

//         const insumo = await Insumo.findById(id)

//         if (!insumo) {
//             const error = new Error("No se encontro insumo!")
//             return res.status(404).json({ msg: error.message })
//         }

//         insumo.stock = insumo.stock + stock || insumo.stock

//         try {
//             const insumoAlmacenado = await insumo.save()
//             res.json(insumoAlmacenado)
//         } catch (error) {
//             console.log(error)
//         }
//         return
//     } 


//     try {
//         const insumo = new Insumo(req.body);
//         const insumoGuardado = await insumo.save();

//         res.json(insumoGuardado);
//     } catch (error) {
//         console.error(error.message);
//     };
// };


const registrar = async (req, res) => {
 console.log(req.body.entradaInsumos)
    for (let i = 0; i < req.body.entradaInsumos.length; i++) {

        const { nombre, tipo, stock, costo, estadoVenta } = req.body.entradaInsumos[i];
        const existeInsumo = await Insumo.find({ nombre }).where({ tipo })

        if (existeInsumo[0]) {
            const id = existeInsumo[0]._id

            const insumo = await Insumo.findById(id)

            if (!insumo) {
                const error = new Error("No se encontro repuesto!")
                // return res.status(404).json({ msg: error.message })
            }

            insumo.stock = insumo.stock + stock || insumo.stock

            try {
                const insumoSave = await insumo.save()
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                //Crea una instancia de usuario para insertar.
                const insumo = new Insumo(req.body.entradaInsumos[i])
                await insumo.save()
                res.json({ msg: "¡Repuesto guardado correctamente!" });
            } catch (error) {
                console.log(error);
            }
        }

    }
     const historial = {
         tipo: "Entrada",
         articulos: req.body.entradaInsumos
     }
     return guardarHistorial(historial)


}

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

const filtrar = async (req, res) => {
    const { nombre, tipo, stock, costo, estante, fila, estadoVenta } = req.body

    var respuesta

    if (nombre) respuesta = await Insumo.find({ nombre: { $regex: nombre } })
    else if (tipo) respuesta = await Insumo.find({ tipo: { $regex: tipo } })
    else if (stock) respuesta = await Insumo.find().where('stock').equals(stock)
    else if (costo) respuesta = await Insumo.find().where('costo').equals(costo)
    else if (estante) respuesta = await Insumo.find().where('estante').equals(estante)
    else if (fila) respuesta = await Insumo.find().where('fila').equals(fila)
    else if (estadoVenta) respuesta = await Insumo.find().where('estadoVenta').equals(estadoVenta)
    else respuesta = "¡No se encontraron repuestos!"
    return res.json(respuesta)
}

const salida = async (req, res) => { 
    if (req.body.insumoSalida.length) {
        var total = 0
        for (let i = 0; i < req.body.insumoSalida.length; i++) {
            const id = req.body.insumoSalida[i]._id
            const stockSalida = req.body.insumoSalida[i].cantidadSalida
            
            const insumo = await Insumo.findById(id)
            
            if (!insumo) {
                const error = new Error("¡Insumo no encontrado!")
                return res.status(404).json({ msg: error.message })
            }
            
            insumo.stock = insumo.stock - stockSalida || insumo.stock
            
            let subTotal = stockSalida * insumo.costo
            
            total = total + subTotal 
            
            try {
                if (insumo.stock == stockSalida) {
                    insumo.stock = 0
                    if (insumo.cantidad == 0) {
                        await Insumo.deleteOne()
                        res.json({ msg: "¡Insumo Eliminado!" })
                    }
                    // return
                }
                
                const insumoAlmacenado = await insumo.save()

            } catch (error) {
                console.log(error)
            }
        }
        const historial = {
            // tipo: req.body.tipo
            tipo: "Salida",
            nombreSalida: req.body.nombreSalida,
            articulos: req.body.insumoSalida,
            totalSalida : total
        }
        return guardarHistorial(historial)
    }
    res.json({ msg: "¡Debe agregar insumos para realizar una salida!" })
}

export {
    prueba,
    registrar,
    actualizar,
    eliminar,
    filtrar,
    salida
};