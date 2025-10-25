import mongoose from 'mongoose';

const tareaSchema = new mongoose.Schema(
    {
        tipo: { type: String },
        estado: { type: String },
        fechaInicio: { type: String },
        fechaFin: { type: String, default: null },
        prioridad: { type: String, default: 'media' },
        idEmpleadoResponsable: { type: mongoose.Schema.Types.Mixed, default: null },
        idTurno: { type: mongoose.Schema.Types.Mixed, default: null },
        idPaciente: { type: mongoose.Schema.Types.Mixed, default: null },
        observaciones: { type: String, default: '' },
        area: { type: String, default: '' }
    });

const Tarea = mongoose.model('Tarea', tareaSchema);

    async function getAll() {
        const docs = await Tarea.find().sort({ createdAt: 1 }).lean();
        return docs.map((d) => ({ ...d, id: d._id }));
    }

    async function add(tarea) {
        const nuevaTarea = new Tarea(tarea);
        return await nuevaTarea.save();
    }

const TareaModel = {
    getAll,
    add
};

export default TareaModel;
