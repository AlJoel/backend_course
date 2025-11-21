import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import webRoutes from './routes/webRoutes.js';
import loginRouter from './controllers/login.js';
import turnoRoutes from './routes/turnoRoutes.js';
import empleadoRoutes from './routes/empleadoRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import methodOverride from 'method-override';
import passport from './middleware/passport.js';
import cookieParser from 'cookie-parser';

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/login', loginRouter);
app.use('/', webRoutes);
app.use('/empleados', empleadoRoutes);
app.use('/turnos', turnoRoutes);
app.use('/tareas', tareaRoutes);
app.use('/pacientes', pacienteRoutes);

// Servidor en escucha
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});