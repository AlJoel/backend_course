import methodOverride from 'method-override';
import express from 'express';
import EmpleadoModel from '../models/empleadoModel.js';
import TurnoModel from '../models/turnoModel.js';
import PacienteModel from '../models/pacienteModel.js';
import esAdmin from '../middleware/esAdmin.js';
import passport from '../middleware/passport.js';

const router = express.Router();
router.use(methodOverride('_method'));

// Login
router.get('/login', (req, res) => {
    res.render('login', { titulo: 'Iniciar sesión' });
});

router.get('/',
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (err || !user) {
                return res.redirect('/login');
            }
            req.user = user;
            next();
        })(req, res, next);
    },
    (req, res) => {
        res.render("home", {titulo: "Menu principal"});
    }
);

// Listados
router.get('/empleados',
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (err || !user) {
                return res.redirect('/login');
            }
            req.user = user;
            next();
        })(req, res, next);
    },
  esAdmin,
    async (req, res) => {
        try {
                const empleados = await EmpleadoModel.getAll();
                res.render("empleados/lista", {titulo: "Empleados", empleados});
        } catch (err) {
                res.status(500).send('Error al cargar empleados');
        }
    }
);

router.get('/pacientes',
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (err || !user) {
                return res.redirect('/login');
            }
            req.user = user;
            next();
        })(req, res, next);
    },
    async (req, res) => {
        try {
                const pacientes = await PacienteModel.getAll();
                res.render("pacientes/lista", {titulo: "Pacientes", pacientes});
        } catch (err) {
                res.status(500).send('Error al cargar pacientes');
        }
    }
);

router.get('/turnos',
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (err || !user) {
                return res.redirect('/login');
            }
            req.user = user;
            next();
        })(req, res, next);
    },
    async (req, res) => {
        try {
                const turnos = await TurnoModel.getAll();
                res.render("turnos/lista", {titulo: "Turnos", turnos});
        } catch (err) {
                res.status(500).send('Error al cargar turnos');
        }
    }
);

// Formularios
router.get('/empleados/nuevo',
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (err || !user) {
                return res.redirect('/login');
            }
            req.user = user;
            next();
        })(req, res, next);
    },
    esAdmin,
    (req, res) => {
        res.render('empleados/nuevo', { titulo: 'Nuevo empleado' });
    }
);

router.get("/pacientes/nuevo", (req, res) => {
   res.render("pacientes/nuevo", {titulo:"Nuevo paciente"});
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

// Editar paciente
router.get('/pacientes/:id/editar', async (req, res) => {
    try {
        const paciente = await PacienteModel.getById(req.params.id);
        if (!paciente) return res.status(404).send('Paciente no encontrado');
        res.render('pacientes/editar', { titulo: 'Editar paciente', paciente });
    } catch (err) {
        res.status(500).send('Error al cargar paciente');
    }
});

// Editar turno
router.get('/turnos/:id/editar', async (req, res) => {
    try {
        const turno = await TurnoModel.getAll().then(arr => arr.find(t => t._id.toString() === req.params.id));
        const empleados = await EmpleadoModel.getAll();
        const medicos = empleados
            .filter(e => e.rol === 'Médico')
            .map(e => ({ _id: e._id, nombre: e.nombre }));
        res.render('turnos/editar', { titulo: 'Editar turno', turno, medicos });
    } catch (err) {
        res.status(500).send('Error al cargar turno');
    }
});

    // Logout
    router.get('/logout', (req, res) => {
        res.clearCookie('token');
        res.redirect('/login');
    });

export default router;