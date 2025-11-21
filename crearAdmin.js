import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import EmpleadoModel from './models/empleadoModel.js';
import dotenv from 'dotenv';

dotenv.config();

async function crearAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);

  const username = 'admin';
  const nombre = 'Administrador';
  const dni = '12345678';
  const rol = 'Administrador';
  const area = null;
  const password = 'admin123';
  const passwordHash = await bcrypt.hash(password, 10);

  const existente = await EmpleadoModel.getByUsername(username);
  if (existente) {
    console.log('Ya existe un usuario administrador con ese username.');
    mongoose.disconnect();
    return;
  }

  await EmpleadoModel.add(username, nombre, dni, rol, area, passwordHash);
  console.log('Usuario administrador creado.');
  mongoose.disconnect();
}

crearAdmin();
