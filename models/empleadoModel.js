import mongoose from 'mongoose';

const empleadoSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        nombre: { type: String },
        dni: { type: String },
        rol: { type: String },
        passwordHash: { type: String }
    });

const Empleado = mongoose.model('Empleado', empleadoSchema);

async function getAll() {
    return await Empleado.find().lean();
}

async function getByUsername(username) {
    return await Empleado.findOne({ username }).lean();
}

async function add(username, nombre, dni, rol, passwordHash) {
    const nuevoEmpleado = new Empleado({ username, nombre, dni, rol, passwordHash });
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
    getByUsername,
    add,
    update,
    patch,
    remove
};

export default EmpleadoModel;
