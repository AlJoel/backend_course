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

async function update(id, nombre, dni, rol) {
    const emp = await Empleado.findById(id);
    if (!emp) return null;

    emp.nombre = nombre;
    emp.dni = dni;
    emp.rol = rol;
    
    const guardado = await emp.save();
    return guardado;
}

async function patch(id, campos) {
    const emp = await Empleado.findById(id);
    if (!emp) return null;

    if (campos.nombre !== undefined) emp.nombre = campos.nombre;
    if (campos.dni !== undefined) emp.dni = campos.dni;
    if (campos.rol !== undefined) emp.rol = campos.rol;

    const guardado = await emp.save();
    return guardado;
}

async function remove(id) {
    return await Empleado.findByIdAndDelete(id);
}


async function getById(id) {
    return await Empleado.findById(id).lean();
}

const EmpleadoModel = {
    getAll,
    getById,
    add,
    update,
    patch,
    remove
};

export default EmpleadoModel;
