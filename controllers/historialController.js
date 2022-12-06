import Historial from "../models/Historial.js"
const guardarHistorial = async (req, res) => {
    try {
        await Historial.create(req)
    } catch (error) {
        console.log(error)
    }
}

export { guardarHistorial }