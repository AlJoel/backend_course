import express from 'express';
import { getPacientes, getPaciente, addPaciente, updatePaciente, deletePaciente } from '../controllers/pacienteController.js';
import passport from '../middleware/passport.js';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), getPacientes);
router.get('/:id', passport.authenticate('jwt', { session: false }), getPaciente);
router.post('/', passport.authenticate('jwt', { session: false }), addPaciente);
router.put('/:id', passport.authenticate('jwt', { session: false }), updatePaciente);
router.delete('/:id', passport.authenticate('jwt', { session: false }), deletePaciente);

export default router;
