import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import webRoutes from './routes/webRoutes.js';
import turnoRoutes from './routes/turnoRoutes.js';
import empleadoRoutes from './routes/empleadoRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use('/', webRoutes);
app.use('/empleados', empleadoRoutes);
app.use('/turnos', turnoRoutes);
app.use('/tareas', tareaRoutes);

// Servidor en escucha
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});