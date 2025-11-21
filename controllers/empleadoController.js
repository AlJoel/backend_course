import EmpleadoModel from '../models/empleadoModel.js';
import bcrypt from 'bcrypt';

const getEmpleados = async (req, res) => {
    try {
        const empleados = await EmpleadoModel.getAll();
        res.json(empleados);
    } catch (err) {
        res.status(500).json({ mensaje: "Error al obtener empleados", error: err.message });
    }
}

const addEmpleado = async (req, res) => {
    try {
    const { username, nombre, dni, rol, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const nuevoEmpleado = await EmpleadoModel.add(username, nombre, dni, rol, passwordHash);
        res.status(201).json({
            mensaje: "Empleado agregado",
            empleado: nuevoEmpleado
        });
    } catch (err) {
        res.status(500).json({ mensaje: "Error al agregar empleado", error: err.message });
    }
}

const updateEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, dni, rol } = req.body;
        const actualizado = await EmpleadoModel.update(id, nombre, dni, rol);
        if (!actualizado) {
            return res.status(404).json({ mensaje: "Empleado no encontrado" });
        }
        res.json({
            mensaje: "Empleado actualizado (PUT)",
            empleado: actualizado
        });
    } catch (err) {
        res.status(500).json({ mensaje: "Error al actualizar empleado", error: err.message });
    }
}

const patchEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const campos = req.body;
        const actualizado = await EmpleadoModel.patch(id, campos);
        if (!actualizado) {
            return res.status(404).json({ mensaje: "Empleado no encontrado" });
        }
        res.json({
            mensaje: "Empleado actualizado (PATCH)",
            empleado: actualizado
        });
    } catch (err) {
        res.status(500).json({ mensaje: "Error al actualizar empleado", error: err.message });
    }
}

const deleteEmpleado = async (req, res) => {
    try {
        const id = req.params.id; 
        const eliminado = await EmpleadoModel.remove(id);
        if (!eliminado) {
            return res.status(404).json({ mensaje: "Empleado no encontrado" });
        }
        return res.status(200).json({
            mensaje: "Empleado eliminado correctamente",
            empleado: eliminado
        });
    } catch (err) {
        res.status(500).json({ mensaje: "Error al eliminar empleado", error: err.message });
    }
}

export { getEmpleados, addEmpleado, updateEmpleado, patchEmpleado, deleteEmpleado };
