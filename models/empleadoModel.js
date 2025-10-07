import mongoose from 'mongoose';

const empleadoSchema = new mongoose.Schema(
    {
        nombre: { type: String },
        dni: { type: String },
        rol: { type: String }
    });

const Empleado = mongoose.model('Empleado', empleadoSchema);

async function getAll() {
    return await Empleado.find().lean();
}

async function add(nombre, dni, rol) {
    const nuevoEmpleado = new Empleado({ nombre, dni, rol });
    return await nuevoEmpleado.save();
}

async function update(id, nombre, dni, rol, area) {
    const updated = await Empleado.findByIdAndUpdate(
        id,
        { nombre, dni, rol, area },
        { new: true }
    ).lean();
    if (!updated) return null;
    updated.id = updated._id;
    return updated;
}

async function patch(id, campos) {
    const updated = await Empleado.findByIdAndUpdate(id, campos, { new: true }).lean();
    if (!updated) return null;
    updated.id = updated._id;
    return updated;
}

async function remove(id) {
    return await Empleado.findByIdAndDelete(id);
}

const EmpleadoModel = {
    getAll,
    add,
    update,
    patch,
    remove
};

export default EmpleadoModel;
