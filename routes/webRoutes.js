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

router.get("/turnos/nuevo", (req, res) => {
    res.render("turnos/nuevo", {titulo:"Nuevo turno"});
});

export default router;