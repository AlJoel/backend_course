
const TurnoModel = require("../models/turnoModel.js");
const TareaModel = require("../models/tareaModel.js");

const getTurnos = (req, res) => {
    res.json(TurnoModel.getAll());
}

const addTurno = (req, res) => {
    const { id, pacienteId, dia, hora, motivo, medicoAsignado, idEmpleadoResponsable, prioridad } = req.body;
    const nuevoTurno = TurnoModel.add(id, pacienteId, dia, hora, motivo, medicoAsignado);

    // Crear tarea asociada alta de turno
    const nuevaTarea = {
        tipo: "Alta de turno",
        estado: "pendiente",
        fechaInicio: new Date().toISOString(),
        fechaFin: null,
        prioridad: prioridad || "media",
        idEmpleadoResponsable: idEmpleadoResponsable || null,
        idTurno: nuevoTurno.id,
        idPaciente: pacienteId,
        observaciones: motivo,
        area: "Administración de Turnos"
    };
    TareaModel.add(nuevaTarea);

    res.status(201).json({
        mensaje: "Turno y tarea asociados agregados",
        turno: nuevoTurno
    });
}

const updateTurno = (req, res) => {
    const { id } = req.params;
    const { pacienteId, dia, hora, motivo, medicoAsignado, idEmpleadoResponsable, prioridad } = req.body;
    const actualizado = TurnoModel.update(id, pacienteId, dia, hora, motivo, medicoAsignado);
    if (!actualizado) {
        return res.status(404).json({ mensaje: "Turno no encontrado" });
    }

    // Crear tarea de reprogramación
    const nuevaTarea = {
        tipo: "Reprogramación o modificación de turno",
        estado: "en proceso",
        fechaInicio: new Date().toISOString(),
        fechaFin: null,
        prioridad: prioridad || "media",
        idEmpleadoResponsable: idEmpleadoResponsable ?? null,
        idTurno: actualizado.id,
        idPaciente: pacienteId,
        observaciones: motivo,
        area: "Administración de Turnos"
    };
    TareaModel.add(nuevaTarea);
    res.json({
        mensaje: "Turno actualizado (PUT) y tarea registrada",
        turno: actualizado
    });
}

const patchTurno = (req, res) => {
    const { id } = req.params;
    const campos = req.body;
    const actualizado = TurnoModel.patch(id, campos);
    if (!actualizado) {
        return res.status(404).json({ mensaje: "Turno no encontrado" });
    }
    const prioridad = campos?.prioridad ?? "media";
    const idEmpleadoResponsable = campos?.idEmpleadoResponsable ?? null;
    const motivo = campos?.motivo ?? actualizado.motivo;

    // Crear tarea actualización parcial
    const nuevaTarea = {
        tipo: "Actualización parcial de turno",
        estado: "en proceso",
        fechaInicio: new Date().toISOString(),
        fechaFin: null,
        prioridad: prioridad,
        idEmpleadoResponsable: idEmpleadoResponsable,
        idTurno: actualizado.id,
        idPaciente: actualizado.pacienteId,
        observaciones: motivo,
        area: "Administración de Turnos"
    };
    TareaModel.add(nuevaTarea);
    res.json({
        mensaje: "Turno actualizado (PATCH) y tarea registrada",
        turno: actualizado
    });
}

const deleteTurno = (req, res) => {
    const id = parseInt(req.params.id);
    const eliminado = TurnoModel.remove(id);
    if (!eliminado) {
        return res.status(404).json({ mensaje: "Turno no encontrado" });
    }

    // Crear tarea cancelacion
    const nuevaTarea = {
        tipo: "Cancelación de turno",
        estado: "finalizada",
        fechaInicio: new Date().toISOString(),
        fechaFin: new Date().toISOString(),
        prioridad: "alta",
        idEmpleadoResponsable: null,
        idTurno: eliminado.id,
        idPaciente: eliminado.pacienteId,
        observaciones: eliminado.motivo,
        area: "Administración de Turnos"
    };
    TareaModel.add(nuevaTarea);
    return res.status(200).json({
        mensaje: "Turno eliminado y tarea registrada",
        turno: eliminado
    });
}

module.exports = { getTurnos, addTurno, updateTurno, patchTurno, deleteTurno };
