import PacienteModel from '../models/pacienteModel.js';

const getPacientes = async (req, res) => {
  try {
    const pacientes = await PacienteModel.getAll();
    res.json(pacientes);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener pacientes', error: err.message });
  }
};

const getPaciente = async (req, res) => {
  try {
    const paciente = await PacienteModel.getById(req.params.id);
    if (!paciente) return res.status(404).json({ mensaje: 'Paciente no encontrado' });
    res.json(paciente);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener paciente', error: err.message });
  }
};

const addPaciente = async (req, res) => {
  try {
    const { nombre, dni, telefono, obraSocial } = req.body;
    const nuevoPaciente = await PacienteModel.add(nombre, dni, telefono, obraSocial);
    res.status(201).json({ mensaje: 'Paciente agregado', paciente: nuevoPaciente });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al agregar paciente', error: err.message });
  }
};

const updatePaciente = async (req, res) => {
  try {
    const { nombre, dni, telefono, obraSocial } = req.body;
    const actualizado = await PacienteModel.update(req.params.id, nombre, dni, telefono, obraSocial);
    if (!actualizado) return res.status(404).json({ mensaje: 'Paciente no encontrado' });
    res.json({ mensaje: 'Paciente actualizado', paciente: actualizado });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al actualizar paciente', error: err.message });
  }
};

const deletePaciente = async (req, res) => {
  try {
    const eliminado = await PacienteModel.remove(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Paciente no encontrado' });
    res.json({ mensaje: 'Paciente eliminado' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar paciente', error: err.message });
  }
};

export { getPacientes, getPaciente, addPaciente, updatePaciente, deletePaciente };
