import express from 'express';
import { getPacientes, getPaciente, addPaciente, updatePaciente, deletePaciente } from '../controllers/pacienteController.js';

const router = express.Router();

router.get('/', getPacientes);
router.get('/:id', getPaciente);
router.post('/', addPaciente);
router.put('/:id', updatePaciente);
router.delete('/:id', deletePaciente);

export default router;
