import { promises as fs } from 'fs';
const TURNOS_PATH = './db/turnos.json';

class TurnoModel {
    constructor() {}

    async _readFile() {
        const data = await fs.readFile(TURNOS_PATH, 'utf-8');
        return JSON.parse(data);
    }

    async _writeFile(data) {
        await fs.writeFile(TURNOS_PATH, JSON.stringify(data, null, 2), 'utf-8');
    }

    async getAll() {
        return await this._readFile();
    }

    async add(id, pacienteId, dia, hora, motivo, medicoAsignado) {
        const turnos = await this._readFile();
        const nuevoTurno = {
            id: parseInt(id),
            pacienteId: pacienteId !== undefined ? parseInt(pacienteId) : null,
            dia,
            hora,
            motivo,
            medicoAsignado: medicoAsignado !== undefined ? parseInt(medicoAsignado) : null
        };
        turnos.push(nuevoTurno);
        await this._writeFile(turnos);
        return nuevoTurno;
    }

    async update(id, pacienteId, dia, hora, motivo, medicoAsignado) {
        const turnos = await this._readFile();
        const index = turnos.findIndex(t => t.id === parseInt(id));
        if (index === -1) return null;
        turnos[index] = {
            id: parseInt(id),
            pacienteId: pacienteId !== undefined ? parseInt(pacienteId) : null,
            dia,
            hora,
            motivo,
            medicoAsignado: medicoAsignado !== undefined ? parseInt(medicoAsignado) : null
        };
        await this._writeFile(turnos);
        return turnos[index];
    }

    async patch(id, campos) {
        const turnos = await this._readFile();
        const index = turnos.findIndex(t => t.id === parseInt(id));
        if (index === -1) return null;
        turnos[index] = { ...turnos[index], ...campos };
        await this._writeFile(turnos);
        return turnos[index];
    }

    async remove(id) {
        const turnos = await this._readFile();
        const index = turnos.findIndex(t => t.id === parseInt(id));
        if (index === -1) return null;
        const eliminado = turnos[index];
        turnos.splice(index, 1);
        await this._writeFile(turnos);
        return eliminado;
    }
}

export default new TurnoModel();
