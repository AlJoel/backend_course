import express from 'express';
import EmpleadoModel from '../models/empleadoModel.js';
import TurnoModel from '../models/turnoModel.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render("home", {titulo: "Menu principal"});
});

//Listados
router.get('/empleados', async (req, res) => {
    try {
        const empleados = await EmpleadoModel.getAll();
        res.render("empleados/lista", {titulo: "Empleados", empleados});
    } catch (err) {
        res.status(500).send('Error al cargar empleados');
    }
});

router.get("/turnos", async (req, res) => {
   try {
       const turnos = await TurnoModel.getAll();
       res.render("turnos/lista", {titulo: "Turnos", turnos});
   } catch (err) {
       res.status(500).send('Error al cargar turnos');
   }
});

//Formularios
router.get("/empleados/nuevo", (req, res) => {
   res.render("empleados/nuevo", {titulo:"Nuevo empleado"});
});

router.get("/turnos/nuevo", async (req, res) => {
    try {
        const empleados = await EmpleadoModel.getAll();
        const medicos = empleados
            .filter(e => e.rol === 'Médico')
            .map(e => ({ id: e._id, nombre: e.nombre }));
        res.render("turnos/nuevo", { titulo: "Nuevo turno", medicos });
    } catch (err) {
        res.status(500).send('Error al preparar formulario de nuevo turno');
    }
});

export default router;