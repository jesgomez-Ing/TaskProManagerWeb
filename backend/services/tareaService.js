const TareaModel = require("../models/tareaModel");

// Obtener todas las tareas
const obtenerTareas = (callback) => {
    TareaModel.obtenerTareas(callback);
};

// Obtener tarea por ID
const obtenerTareaPorId = (id, callback) => {

    if (!id || isNaN(id)) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "El ID de la tarea no es válido"
        });
    }

    TareaModel.obtenerTareaPorId(id, callback);
};

// Crear tarea
const crearTarea = (tarea, callback) => {

    // Validar información obligatoria
    if (!tarea.titulo || !tarea.titulo.trim()) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "El título de la tarea es obligatorio"
        });
    }

    if (!tarea.descripcion || !tarea.descripcion.trim()) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "La descripción de la tarea es obligatoria"
        });
    }

    if (!tarea.estado || !tarea.estado.trim()) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "El estado de la tarea es obligatorio"
        });
    }

    // Validar estados permitidos
    const estadosPermitidos = [
        "Pendiente",
        "En Progreso",
        "Completada"
    ];

    if (!estadosPermitidos.includes(tarea.estado)) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "El estado debe ser Pendiente, En Progreso o Completada"
        });
    }

    // Si todas las validaciones son correctas,
    // se delega el acceso a datos al modelo.
    TareaModel.crearTarea(tarea, callback);
};

// Actualizar tarea
const actualizarTarea = (id, tarea, callback) => {

    if (!id || isNaN(id)) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "El ID de la tarea no es válido"
        });
    }

    if (!tarea.titulo || !tarea.titulo.trim()) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "El título de la tarea es obligatorio"
        });
    }

    if (!tarea.descripcion || !tarea.descripcion.trim()) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "La descripción de la tarea es obligatoria"
        });
    }

    if (!tarea.estado || !tarea.estado.trim()) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "El estado de la tarea es obligatorio"
        });
    }

    const estadosPermitidos = [
        "Pendiente",
        "En Progreso",
        "Completada"
    ];

    if (!estadosPermitidos.includes(tarea.estado)) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "El estado debe ser Pendiente, En Progreso o Completada"
        });
    }

    TareaModel.actualizarTarea(id, tarea, callback);
};

// Eliminar tarea
const eliminarTarea = (id, callback) => {

    if (!id || isNaN(id)) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "El ID de la tarea no es válido"
        });
    }

    TareaModel.eliminarTarea(id, callback);
};

module.exports = {
    obtenerTareas,
    obtenerTareaPorId,
    crearTarea,
    actualizarTarea,
    eliminarTarea
};