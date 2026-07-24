const TareaModel = require("../models/tareaModel");

// Obtener todas las tareas
const obtenerTareas = (req, res) => {

    TareaModel.obtenerTareas((err, tareas) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(tareas);

    });

};

// Obtener tarea por ID
const obtenerTareaPorId = (req, res) => {

    const id = req.params.id;

    TareaModel.obtenerTareaPorId(id, (err, tarea) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (!tarea) {
            return res.status(404).json({
                mensaje: "Tarea no encontrada"
            });
        }

        res.json(tarea);

    });

};

// Crear tarea
const crearTarea = (req, res) => {

    TareaModel.crearTarea(req.body, (err, id) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.status(201).json({
            mensaje: "Tarea creada correctamente",
            id: id
        });

    });

};

// Actualizar tarea
const actualizarTarea = (req, res) => {

    const id = req.params.id;

    TareaModel.actualizarTarea(id, req.body, (err, cambios) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (cambios === 0) {
            return res.status(404).json({
                mensaje: "Tarea no encontrada"
            });
        }

        res.json({
            mensaje: "Tarea actualizada correctamente"
        });

    });

};

// Eliminar tarea
const eliminarTarea = (req, res) => {

    const id = req.params.id;

    TareaModel.eliminarTarea(id, (err, cambios) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (cambios === 0) {
            return res.status(404).json({
                mensaje: "Tarea no encontrada"
            });
        }

        res.json({
            mensaje: "Tarea eliminada correctamente"
        });

    });

};

module.exports = {

    obtenerTareas,
    obtenerTareaPorId,
    crearTarea,
    actualizarTarea,
    eliminarTarea

};
