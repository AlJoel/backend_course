const express = require('express');
const EmpleadoModel = require('../models/EmpleadoModel');
const TurnoModel = require('../models/TurnoModel');

const router = express.Router();

router.get('/', (req, res) => {
    res.render("index", {titulo: "Panel"});
});

//Listados
router.get('/empleados', (req, res) => {
    const empleados = EmpleadoModel.getAll();
    res.render("empleados/lista", {titulo: "Empleados", empleados});
});

router.get("/turnos", (req, res) => {
   const turnos = TurnoModel.getAll();
   res.render("turnos/lista", {titulo: "Turnos", turnos});
});

//Formularios
router.get("/empleados/nuevo", (req, res) => {
   res.render("empleados/nuevo", {titulo:"Nuevo empleado"});
});

router.get("/turnos/nuevo", (req, res) => {
    res.render("turnos/nuevo", {titulo:"Nuevo turno"});
});

module.exports = router;