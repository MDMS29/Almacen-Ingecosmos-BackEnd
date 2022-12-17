import HistorialRepuestos from "../models/HistorialRepuestos.js"

const guardarHistorial = async (req, res) => {
    try {
        await HistorialRepuestos.create(req)
    } catch (error) {
        console.log(error)
    }
}

const mostrarHistorialRepuestos = async (req, res) => {
    const historialRepuestos = await HistorialRepuestos.find().populate({ path: 'articulos', select : '-createdAt -updatedAt -__v -cantidad'})   
    res.json(historialRepuestos)
}

export { guardarHistorial, mostrarHistorialRepuestos }