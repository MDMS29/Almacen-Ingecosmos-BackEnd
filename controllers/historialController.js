import HistorialInsumo  from "../models/historialInsumo.js"

const guardarHistorial = async (req, res) => {
    try {
        await HistorialInsumo.create(req)
    } catch (error) {
        console.log(error)
    }
}

const mostrarHistorial = async (req, res) => {
    const historialInsumo = await HistorialInsumo.find().populate({ path: 'articulos', select : '-createdAt -updatedAt -__v -cantidad'})   
    res.json(historialInsumo)
}

export { guardarHistorial, mostrarHistorial }