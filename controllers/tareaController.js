const TareaModel = require("../models/tareaModel.js");

const getTareas = (req, res) => {
    res.json(TareaModel.getAll());
}

const buscar = (req, res) => {
    const {
        estado,
        prioridad,
        fechaInicio,
        idEmpleadoResponsable,
        idPaciente
    } = req.query || {}
    const tareas = TareaModel.getAll() || [];

    const resultado = tareas.filter(t => {
        if (estado && t.estado !== estado) return false;
        if (prioridad && t.prioridad !== prioridad) return false;

        if (fechaInicio && !String(t.fechaInicio).startsWith(String(fechaInicio))) return false;

        if (idEmpleadoResponsable && Number(t.idEmpleadoResponsable) !== Number(idEmpleadoResponsable)) return false;
        if (idPaciente && Number(t.idPaciente) !== Number(idPaciente)) return false;

        return true;
    });

    res.json(resultado);
};

module.exports = { getTareas, buscar };