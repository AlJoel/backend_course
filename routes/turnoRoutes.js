import express from 'express';
import { getTurnos, addTurno, updateTurno, patchTurno, deleteTurno } from '../controllers/turnoController.js';

const router = express.Router();

router.get('/', getTurnos);
router.post('/agregar', addTurno);
router.put('/:id', updateTurno);
router.patch('/:id', patchTurno);
router.delete('/:id', deleteTurno);

export default router;
