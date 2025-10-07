const TareaModel = require("../models/tareaModel.js");

const getTareas = async (req, res) => {
    try {
        const tareas = await TareaModel.getAll();
        res.json(tareas);
    } catch (err) {
        res.status(500).json({ mensaje: "Error al obtener tareas", error: err.message });
    }
}

const buscar = async (req, res) => {
    try {
        const {
            estado,
            prioridad,
            fechaInicio,
            idEmpleadoResponsable,
            idPaciente
        } = req.query || {}
        const tareas = (await TareaModel.getAll()) || [];

        const resultado = tareas.filter(t => {
            if (estado && t.estado !== estado) return false;
            if (prioridad && t.prioridad !== prioridad) return false;

            if (fechaInicio && !String(t.fechaInicio).startsWith(String(fechaInicio))) return false;

            if (idEmpleadoResponsable && Number(t.idEmpleadoResponsable) !== Number(idEmpleadoResponsable)) return false;
            if (idPaciente && Number(t.idPaciente) !== Number(idPaciente)) return false;

            return true;
        });

        res.json(resultado);
    } catch (err) {
        res.status(500).json({ mensaje: "Error en búsqueda de tareas", error: err.message });
    }
};

module.exports = { getTareas, buscar };