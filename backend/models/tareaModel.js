const db = require("../database/database");

// Obtener todas las tareas
const obtenerTareas = (callback) => {

    const sql = `
        SELECT
            tareas.id,
            tareas.titulo,
            tareas.descripcion,
            tareas.prioridad,
            tareas.fecha_inicio,
            tareas.fecha_vencimiento,
            tareas.estado,
            tareas.responsable_id,
            usuarios.nombre AS responsable
        FROM tareas
        LEFT JOIN usuarios
            ON tareas.responsable_id = usuarios.id
        ORDER BY tareas.id DESC
    `;

    db.all(sql, [], callback);

};

// Obtener una tarea por ID
const obtenerTareaPorId = (id, callback) => {

    const sql = `
        SELECT
            tareas.id,
            tareas.titulo,
            tareas.descripcion,
            tareas.prioridad,
            tareas.fecha_inicio,
            tareas.fecha_vencimiento,
            tareas.estado,
            tareas.responsable_id,
            usuarios.nombre AS responsable
        FROM tareas
        LEFT JOIN usuarios
            ON tareas.responsable_id = usuarios.id
        WHERE tareas.id = ?
    `;

    db.get(sql, [id], callback);

};

// Crear tarea
const crearTarea = (tarea, callback) => {

    const sql = `
        INSERT INTO tareas
        (
            titulo,
            descripcion,
            prioridad,
            fecha_inicio,
            fecha_vencimiento,
            estado,
            responsable_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [
            tarea.titulo,
            tarea.descripcion,
            tarea.prioridad,
            tarea.fecha_inicio,
            tarea.fecha_vencimiento,
            tarea.estado,
            tarea.responsable_id
        ],
        function(err){

            callback(err, this.lastID);

        }
    );

};

// Actualizar tarea
const actualizarTarea = (id, tarea, callback) => {

    const sql = `
        UPDATE tareas
        SET
            titulo = ?,
            descripcion = ?,
            prioridad = ?,
            fecha_inicio = ?,
            fecha_vencimiento = ?,
            estado = ?,
            responsable_id = ?
        WHERE id = ?
    `;

    db.run(
        sql,
        [
            tarea.titulo,
            tarea.descripcion,
            tarea.prioridad,
            tarea.fecha_inicio,
            tarea.fecha_vencimiento,
            tarea.estado,
            tarea.responsable_id,
            id
        ],
        function(err){

            callback(err, this.changes);

        }
    );

};

// Eliminar tarea
const eliminarTarea = (id, callback) => {

    db.run(
        "DELETE FROM tareas WHERE id = ?",
        [id],
        function(err){

            callback(err, this.changes);

        }
    );

};

module.exports = {

    obtenerTareas,
    obtenerTareaPorId,
    crearTarea,
    actualizarTarea,
    eliminarTarea

};
