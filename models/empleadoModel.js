const fs = require('fs');
const EMPLEADOS_PATH = './db/empleados.json';

class EmpleadoModel {
    constructor() {}

    _readFile() {
        const data = fs.readFileSync(EMPLEADOS_PATH, 'utf-8');
        return JSON.parse(data);
    }

    _writeFile(data) {
        fs.writeFileSync(EMPLEADOS_PATH, JSON.stringify(data, null, 2), 'utf-8');
    }

    getAll() {
        return this._readFile();
    }

    add(id, nombre, dni, rol, area) {
        const empleados = this._readFile();
        const nuevoEmpleado = {
            id: parseInt(id),
            nombre,
            dni,
            rol,
            area
        };
        empleados.push(nuevoEmpleado);
        this._writeFile(empleados);
        return nuevoEmpleado;
    }

    update(id, nombre, dni, rol, area) {
        const empleados = this._readFile();
        const index = empleados.findIndex(e => e.id === parseInt(id));
        if (index === -1) return null;
        empleados[index] = {
            id: parseInt(id),
            nombre,
            dni,
            rol,
            area
        };
        this._writeFile(empleados);
        return empleados[index];
    }

    patch(id, campos) {
        const empleados = this._readFile();
        const index = empleados.findIndex(e => e.id === parseInt(id));
        if (index === -1) return null;
        empleados[index] = { ...empleados[index], ...campos };
        this._writeFile(empleados);
        return empleados[index];
    }

    remove(id) {
        const empleados = this._readFile();
        const index = empleados.findIndex(e => e.id === parseInt(id));
        if (index === -1) return null;
        const eliminado = empleados[index];
        empleados.splice(index, 1);
        this._writeFile(empleados);
        return eliminado;
    }
}

module.exports = new EmpleadoModel();
