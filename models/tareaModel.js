const fs = require('fs').promises;

const TAREAS_PATH = './db/tareas.json';

class TareaModel {
    async _readFile() {
        const data = await fs.readFile(TAREAS_PATH, 'utf-8');
        return JSON.parse(data);
    }

    async _writeFile(data) {
        await fs.writeFile(TAREAS_PATH, JSON.stringify(data, null, 2), 'utf-8');
    }

    async getAll() {
        return await this._readFile();
    }

    async add(tarea) {
        const tareas = await this._readFile();
        tarea.id = tareas.length > 0 ? tareas[tareas.length - 1].id + 1 : 1;
        tareas.push(tarea);
        await this._writeFile(tareas);
        return tarea;
    }

    async update(id, campos) {
        const tareas = await this._readFile();
        const index = tareas.findIndex(t => t.id === parseInt(id));
        if (index === -1) return null;
        tareas[index] = { ...tareas[index], ...campos };
        await this._writeFile(tareas);
        return tareas[index];
    }

    async remove(id) {
        const tareas = await this._readFile();
        const index = tareas.findIndex(t => t.id === parseInt(id));
        if (index === -1) return null;
        const eliminado = tareas[index];
        tareas.splice(index, 1);
        await this._writeFile(tareas);
        return eliminado;
    }
}

module.exports = new TareaModel();
