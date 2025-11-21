import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
import EmpleadoModel from '../models/empleadoModel.js';

const loginRouter = express.Router();

loginRouter.post('/', async (request, response) => { 
    const body = request.body; 
    const empleado = await EmpleadoModel.getByUsername(body.username);
    const passwordCorrect = empleado === undefined ? false : await bcrypt.compare(body.password, empleado.passwordHash);

    if (!(empleado && passwordCorrect)) { 
        return response.status(401).json({ error: 'Usuario o contraseña inválida' }); 
    }

    const userForToken = { username: empleado.username, id: empleado._id, rol: empleado.rol };

    const token = jwt.sign(userForToken, process.env.SECRET);

    response
        .cookie('token', token, { httpOnly: true, sameSite: 'strict' })
        .status(200)
        .json({ mensaje: 'Login exitoso' });
});

export default loginRouter;
