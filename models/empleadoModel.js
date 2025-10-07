import { promises as fs } from 'fs';
const EMPLEADOS_PATH = './db/empleados.json';

class EmpleadoModel {
    constructor() {}

    async _readFile() {
        const data = await fs.readFile(EMPLEADOS_PATH, 'utf-8');
        return JSON.parse(data);
    }

    async _writeFile(data) {
        await fs.writeFile(EMPLEADOS_PATH, JSON.stringify(data, null, 2), 'utf-8');
    }

    async getAll() {
        return await this._readFile();
    }

    async add(id, nombre, dni, rol, area) {
        const empleados = await this._readFile();
        const nuevoEmpleado = {
            id: parseInt(id),
            nombre,
            dni,
            rol,
            area
        };
        empleados.push(nuevoEmpleado);
        await this._writeFile(empleados);
        return nuevoEmpleado;
    }

    async update(id, nombre, dni, rol, area) {
        const empleados = await this._readFile();
        const index = empleados.findIndex(e => e.id === parseInt(id));
        if (index === -1) return null;
        empleados[index] = {
            id: parseInt(id),
            nombre,
            dni,
            rol,
            area
        };
        await this._writeFile(empleados);
        return empleados[index];
    }

    async patch(id, campos) {
        const empleados = await this._readFile();
        const index = empleados.findIndex(e => e.id === parseInt(id));
        if (index === -1) return null;
        empleados[index] = { ...empleados[index], ...campos };
        await this._writeFile(empleados);
        return empleados[index];
    }

    async remove(id) {
        const empleados = await this._readFile();
        const index = empleados.findIndex(e => e.id === parseInt(id));
        if (index === -1) return null;
        const eliminado = empleados[index];
        empleados.splice(index, 1);
        await this._writeFile(empleados);
        return eliminado;
    }
}

export default new EmpleadoModel();
