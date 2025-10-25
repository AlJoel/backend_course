import mongoose from 'mongoose';

const turnoSchema = new mongoose.Schema(
    {
        pacienteId: { type: Number, default: null },
        dia: { type: String },
        hora: { type: String },
        motivo: { type: String },
        medicoAsignado: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', default: null }
    });

const Turno = mongoose.model('Turno', turnoSchema);


async function getAll() {
    return await Turno.find()
        .populate('medicoAsignado', 'nombre')
        .lean();
}

async function add(pacienteId, dia, hora, motivo, medicoAsignado) {
    const nuevoTurno = new Turno({ pacienteId, dia, hora, motivo, medicoAsignado });
    return await nuevoTurno.save();
}

async function update(id, pacienteId, dia, hora, motivo, medicoAsignado) {
    const turno = await Turno.findById(id);
    if (!turno) return null;
    
    turno.pacienteId = pacienteId;
    turno.dia = dia;
    turno.hora = hora;
    turno.motivo = motivo;
    turno.medicoAsignado = medicoAsignado;

    const guardado = await turno.save();
    return guardado;
}

async function patch(id, campos) {
    const turno = await Turno.findById(id);
    if (!turno) return null;

    if (campos.pacienteId !== undefined) turno.pacienteId = campos.pacienteId;
    if (campos.dia !== undefined) turno.dia = campos.dia;
    if (campos.hora !== undefined) turno.hora = campos.hora;
    if (campos.motivo !== undefined) turno.motivo = campos.motivo;
    if (campos.medicoAsignado !== undefined) turno.medicoAsignado = campos.medicoAsignado;

    const guardado = await turno.save();
    return guardado;
}

async function remove(id) {
    return await Turno.findByIdAndDelete(id);
}

const TurnoModel = {
    getAll,
    add,
    update,
    patch,
    remove
};

export default TurnoModel;
