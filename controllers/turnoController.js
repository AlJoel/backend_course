import TurnoModel from '../models/turnoModel.js';
import TareaModel from '../models/tareaModel.js';
import PacienteModel from '../models/pacienteModel.js';

const getTurnos = async (req, res) => {
    try {
        const turnos = await TurnoModel.getAll();
        res.json(turnos);
    } catch (err) {
        res.status(500).json({ mensaje: "Error al obtener turnos", error: err.message });
    }
}

const addTurno = async (req, res) => {
    try {
        const { dniPaciente, dia, hora, motivo, medicoAsignado, prioridad } = req.body;
        console.log('Datos recibidos para nuevo turno:', req.body);
        
        const paciente = await PacienteModel.getAll().then(arr => arr.find(p => p.dni === dniPaciente));
        console.log('Paciente encontrado:', paciente);
        if (!paciente) {
            console.error('Paciente no encontrado para DNI:', dniPaciente);
            return res.status(404).json({ mensaje: "Paciente no encontrado. Verifique el DNI." });
        }
        const pacienteId = paciente._id;
        const nuevoTurno = await TurnoModel.add(pacienteId, dia, hora, motivo, medicoAsignado);
        console.log('Turno creado:', nuevoTurno);

        // Crear tarea asociada alta de turno
        const nuevaTarea = {
            tipo: "Alta de turno",
            estado: "pendiente",
            fechaInicio: new Date().toISOString(),
            fechaFin: null,
            prioridad: prioridad || "media",
            idEmpleadoResponsable: req.user?._id || null,
            idTurno: nuevoTurno.id,
            idPaciente: pacienteId,
            observaciones: motivo,
            area: "Administración de Turnos"
        };
        await TareaModel.add(nuevaTarea);

        res.status(201).json({
            mensaje: "Turno y tarea asociados agregados",
            turno: nuevoTurno
        });
    } catch (err) {
        console.error('Error al agregar turno:', err);
        res.status(500).json({ mensaje: "Error al agregar turno", error: err.message });
    }
}

const updateTurno = async (req, res) => {
    try {
        const { id } = req.params;
        const { pacienteId, dia, hora, motivo, medicoAsignado, idEmpleadoResponsable, prioridad } = req.body;
        const actualizado = await TurnoModel.update(id, pacienteId, dia, hora, motivo, medicoAsignado);
        if (!actualizado) {
            return res.status(404).json({ mensaje: "Turno no encontrado" });
        }

        // Crear tarea de reprogramacion
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
        await TareaModel.add(nuevaTarea);
        res.json({
            mensaje: "Turno actualizado (PUT) y tarea registrada",
            turno: actualizado
        });
    } catch (err) {
        res.status(500).json({ mensaje: "Error al actualizar turno", error: err.message });
    }
}

const patchTurno = async (req, res) => {
    try {
        const { id } = req.params;
        const campos = req.body;
        const actualizado = await TurnoModel.patch(id, campos);
        if (!actualizado) {
            return res.status(404).json({ mensaje: "Turno no encontrado" });
        }
        const prioridad = campos?.prioridad ?? "media";
        const idEmpleadoResponsable = campos?.idEmpleadoResponsable ?? null;
        const motivo = campos?.motivo ?? actualizado.motivo;

        // Crear tarea actualizacicion parcial
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
        await TareaModel.add(nuevaTarea);
        res.json({
            mensaje: "Turno actualizado (PATCH) y tarea registrada",
            turno: actualizado
        });
    } catch (err) {
        res.status(500).json({ mensaje: "Error al actualizar turno (PATCH)", error: err.message });
    }
}

const deleteTurno = async (req, res) => {
    try {
        const id = req.params.id;
        const eliminado = await TurnoModel.remove(id);
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
        await TareaModel.add(nuevaTarea);
        return res.status(200).json({
            mensaje: "Turno eliminado y tarea registrada",
            turno: eliminado
        });
    } catch (err) {
        res.status(500).json({ mensaje: "Error al eliminar turno", error: err.message });
    }
}

const listarTurnosVista = async (req, res) => {
    try {
        // Traemos turnos y pacientes en paralelo
        const [turnos, pacientes] = await Promise.all([
            TurnoModel.getAll(),
            PacienteModel.getAll()
        ]);

        // Enriquecemos cada turno con el nombre del paciente
        const turnosConNombre = turnos.map(t => {
            const paciente = pacientes.find(p => String(p._id) === String(t.pacienteId));
            return {
                ...t,
                pacienteNombre: paciente ? paciente.nombre : t.pacienteId // fallback al id
            };
        });

        res.render('turnos/lista', {
            titulo: 'Turnos',
            turnos: turnosConNombre
        });
    } catch (err) {
        console.error('Error al obtener turnos para la vista:', err);
        res.status(500).send('Error al obtener turnos');
    }
};

export { getTurnos, addTurno, updateTurno, patchTurno, deleteTurno, listarTurnosVista };
