const fs = require('fs');
const TURNOS_PATH = './db/turnos.json';

class TurnoModel {
    constructor() {}

    _readFile() {
        const data = fs.readFileSync(TURNOS_PATH, 'utf-8');
        return JSON.parse(data);
    }

    _writeFile(data) {
        fs.writeFileSync(TURNOS_PATH, JSON.stringify(data, null, 2), 'utf-8');
    }

    getAll() {
        return this._readFile();
    }

    add(id, pacienteId, dia, hora, motivo, medicoAsignado) {
        const turnos = this._readFile();
        const nuevoTurno = {
            id: parseInt(id),
            pacienteId: pacienteId !== undefined ? parseInt(pacienteId) : null,
            dia,
            hora,
            motivo,
            medicoAsignado: medicoAsignado !== undefined ? parseInt(medicoAsignado) : null
        };
        turnos.push(nuevoTurno);
        this._writeFile(turnos);
        return nuevoTurno;
    }

    update(id, pacienteId, dia, hora, motivo, medicoAsignado) {
        const turnos = this._readFile();
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
        this._writeFile(turnos);
        return turnos[index];
    }

    patch(id, campos) {
        const turnos = this._readFile();
        const index = turnos.findIndex(t => t.id === parseInt(id));
        if (index === -1) return null;
        turnos[index] = { ...turnos[index], ...campos };
        this._writeFile(turnos);
        return turnos[index];
    }

    remove(id) {
        const turnos = this._readFile();
        const index = turnos.findIndex(t => t.id === parseInt(id));
        if (index === -1) return null;
        const eliminado = turnos[index];
        turnos.splice(index, 1);
        this._writeFile(turnos);
        return eliminado;
    }
}

module.exports = new TurnoModel();
