import mongoose from 'mongoose';

const pacienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  dni: { type: String, required: true },
  telefono: { type: String, required: true },
  obraSocial: { type: String, required: true }
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

async function getAll() {
  return await Paciente.find().lean();
}

async function getById(id) {
  return await Paciente.findById(id).lean();
}

async function add(nombre, dni, telefono, obraSocial) {
  const nuevoPaciente = new Paciente({ nombre, dni, telefono, obraSocial });
  return await nuevoPaciente.save();
}

async function update(id, nombre, dni, telefono, obraSocial) {
  return await Paciente.findByIdAndUpdate(id, { nombre, dni, telefono, obraSocial }, { new: true });
}

async function remove(id) {
  return await Paciente.findByIdAndDelete(id);
}

export default { getAll, getById, add, update, remove };
