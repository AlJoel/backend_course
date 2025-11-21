import express from 'express';
import { getEmpleados, addEmpleado, updateEmpleado, patchEmpleado, deleteEmpleado } from '../controllers/empleadoController.js';
import passport from '../middleware/passport.js';
import esAdmin from '../middleware/esAdmin.js';

const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), esAdmin, getEmpleados);
router.post('/agregar', passport.authenticate('jwt', { session: false }), esAdmin, addEmpleado);
router.put('/:id', passport.authenticate('jwt', { session: false }), esAdmin, updateEmpleado);
router.patch('/:id', passport.authenticate('jwt', { session: false }), esAdmin, patchEmpleado);
router.delete('/:id', passport.authenticate('jwt', { session: false }), esAdmin, deleteEmpleado);

export default router;
