import express from 'express';
import { getEmpleados, addEmpleado, updateEmpleado, patchEmpleado, deleteEmpleado } from '../controllers/empleadoController.js';

const router = express.Router();

router.get('/', getEmpleados);
router.post('/agregar', addEmpleado);
router.put('/:id', updateEmpleado);
router.patch('/:id', patchEmpleado);
router.delete('/:id', deleteEmpleado);

export default router;
