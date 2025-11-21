import express from 'express';
import { getTurnos, addTurno, updateTurno, patchTurno, deleteTurno } from '../controllers/turnoController.js';
import passport from '../middleware/passport.js';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), getTurnos);
router.post('/agregar', passport.authenticate('jwt', { session: false }), addTurno);
router.put('/:id', passport.authenticate('jwt', { session: false }), updateTurno);
router.patch('/:id', passport.authenticate('jwt', { session: false }), patchTurno);
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteTurno);

export default router;
