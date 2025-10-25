import express from 'express';
const router = express.Router();
import { buscar } from '../controllers/tareaController.js';

router.get('/buscar', buscar);

export default router;