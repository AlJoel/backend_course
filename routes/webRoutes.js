

import methodOverride from 'method-override';
import express from 'express';
import EmpleadoModel from '../models/empleadoModel.js';
import TurnoModel from '../models/turnoModel.js';

const router = express.Router();
router.use(methodOverride('_method'));

router.get('/', (req, res) => {
    res.render("home", {titulo: "Menu principal"});
});

router.put('/empleados/:id', async (req, res) => {
    try {
        const { nombre, dni, rol } = req.body;
        await EmpleadoModel.update(req.params.id, nombre, dni, rol);
        res.redirect('/empleados');
    } catch (err) {
        res.status(500).send('Error al actualizar empleado');
    }
});

router.put('/turnos/:id', async (req, res) => {
    try {
        const { pacienteId, dia, hora, motivo, medicoAsignado } = req.body;
        await TurnoModel.update(req.params.id, pacienteId, dia, hora, motivo, medicoAsignado);
        res.redirect('/turnos');
    } catch (err) {
        res.status(500).send('Error al actualizar turno');
    }
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

// Editar empleado
router.get('/empleados/:id/editar', async (req, res) => {
    try {
        const empleado = await EmpleadoModel.getById(req.params.id);
        if (!empleado) return res.status(404).send('Empleado no encontrado');
        res.render('empleados/editar', { titulo: 'Editar empleado', empleado });
    } catch (err) {
        res.status(500).send('Error al cargar empleado');
    }
});

// Editar turno
router.get('/turnos/:id/editar', async (req, res) => {
    try {
        const turno = await TurnoModel.getAll().then(arr => arr.find(t => t._id.toString() === req.params.id));
        const empleados = await EmpleadoModel.getAll();
        const medicos = empleados
            .filter(e => e.rol === 'Médico')
            .map(e => ({ id: e._id, nombre: e.nombre }));
        res.render('turnos/editar', { titulo: 'Editar turno', turno, medicos });
    } catch (err) {
        res.status(500).send('Error al cargar turno');
    }
});

export default router;