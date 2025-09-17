const fs = require('fs');

const TAREAS_PATH = './db/tareas.json';

class TareaModel {
    _readFile() {
        const data = fs.readFileSync(TAREAS_PATH, 'utf-8');
        return JSON.parse(data);
    }

    _writeFile(data) {
        fs.writeFileSync(TAREAS_PATH, JSON.stringify(data, null, 2), 'utf-8');
    }

    getAll() {
        return this._readFile();
    }

    add(tarea) {
        const tareas = this._readFile();
        tarea.id = tareas.length > 0 ? tareas[tareas.length - 1].id + 1 : 1;
        tareas.push(tarea);
        this._writeFile(tareas);
        return tarea;
    }

    update(id, campos) {
        const tareas = this._readFile();
        const index = tareas.findIndex(t => t.id === parseInt(id));
        if (index === -1) return null;
        tareas[index] = { ...tareas[index], ...campos };
        this._writeFile(tareas);
        return tareas[index];
    }

    remove(id) {
        const tareas = this._readFile();
        const index = tareas.findIndex(t => t.id === parseInt(id));
        if (index === -1) return null;
        const eliminado = tareas[index];
        tareas.splice(index, 1);
        this._writeFile(tareas);
        return eliminado;
    }
}

module.exports = new TareaModel();
