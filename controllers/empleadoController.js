const EmpleadoModel = require("../models/empleadoModel.js");

const getEmpleados = (req, res) => {
    res.json(EmpleadoModel.getAll());
}

const addEmpleado = (req, res) => {
    const { id, nombre, dni, rol, area } = req.body;
    const nuevoEmpleado = EmpleadoModel.add(id, nombre, dni, rol, area);
    res.status(201).json({
        mensaje: "Empleado agregado",
        empleado: nuevoEmpleado
    });
}

const updateEmpleado = (req, res) => {
    const { id } = req.params;
    const { nombre, dni, rol, area } = req.body;
    const actualizado = EmpleadoModel.update(id, nombre, dni, rol, area);
    if (!actualizado) {
        return res.status(404).json({ mensaje: "Empleado no encontrado" });
    }
    res.json({
        mensaje: "Empleado actualizado (PUT)",
        empleado: actualizado
    });
}

const patchEmpleado = (req, res) => {
    const { id } = req.params;
    const campos = req.body;
    const actualizado = EmpleadoModel.patch(id, campos);
    if (!actualizado) {
        return res.status(404).json({ mensaje: "Empleado no encontrado" });
    }
    res.json({
        mensaje: "Empleado actualizado (PATCH)",
        empleado: actualizado
    });
}

const deleteEmpleado = (req, res) => {
    const id = parseInt(req.params.id);
    const eliminado = EmpleadoModel.remove(id);
    if (!eliminado) {
        return res.status(404).json({ mensaje: "Empleado no encontrado" });
    }
    return res.status(200).json({
        mensaje: "Empleado eliminado correctamente",
        empleado: eliminado
    });
}

module.exports = { getEmpleados, addEmpleado, updateEmpleado, patchEmpleado, deleteEmpleado };
