import HistorialRepuestos from "../models/HistorialRepuestos.js"
const guardarHistorial = async (req, res) => {
    try {
        await HistorialRepuestos.create(req)
    } catch (error) {
        console.log(error)
    }
}

export { guardarHistorial }