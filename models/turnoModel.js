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
    return await Turno.find().lean();
}

async function add(pacienteId, dia, hora, motivo, medicoAsignado) {
    const nuevoTurno = new Turno({ pacienteId, dia, hora, motivo, medicoAsignado });
    return await nuevoTurno.save();
}

async function update(id, pacienteId, dia, hora, motivo, medicoAsignado) {
    const pacienteNum = pacienteId !== undefined && pacienteId !== null && pacienteId !== '' ? parseInt(pacienteId) : null;
    const updated = mongoose.Types.ObjectId.isValid(id)
        ? await Turno.findByIdAndUpdate(id, { pacienteId: pacienteNum, dia, hora, motivo, medicoAsignado }, { new: true }).lean()
        : null;
    if (!updated) return null;
    updated.id = updated._id;
    return updated;
}

async function patch(id, campos) {
    if (campos.pacienteId !== undefined) campos.pacienteId = campos.pacienteId === '' ? null : parseInt(campos.pacienteId);
    // no parsear medicoAsignado a number; permitir string/ObjectId/null
    if (campos.medicoAsignado !== undefined) campos.medicoAsignado = campos.medicoAsignado === '' ? null : campos.medicoAsignado;
    const updated = mongoose.Types.ObjectId.isValid(id)
        ? await Turno.findByIdAndUpdate(id, campos, { new: true }).lean()
        : null;
    if (!updated) return null;
    updated.id = updated._id;
    return updated;
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
