const TareaService = require("../services/tareaService");

// Obtener todas las tareas
const obtenerTareas = (req, res) => {

    TareaService.obtenerTareas((err, tareas) => {

        if (err) {
            return res.status(500).json({
                error: err.message || err.mensaje
            });
        }

        res.json(tareas);

    });

};


// Obtener tarea por ID
const obtenerTareaPorId = (req, res) => {

    const id = req.params.id;

    TareaService.obtenerTareaPorId(id, (err, tarea) => {

        if (err) {

            if (err.tipo === "VALIDACION") {
                return res.status(400).json({
                    error: err.mensaje
                });
            }

            return res.status(500).json({
                error: err.message || err.mensaje
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

    TareaService.crearTarea(req.body, (err, id) => {

        if (err) {

            if (err.tipo === "VALIDACION") {
                return res.status(400).json({
                    error: err.mensaje
                });
            }

            return res.status(500).json({
                error: err.message || err.mensaje
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

    TareaService.actualizarTarea(id, req.body, (err, cambios) => {

        if (err) {

            if (err.tipo === "VALIDACION") {
                return res.status(400).json({
                    error: err.mensaje
                });
            }

            return res.status(500).json({
                error: err.message || err.mensaje
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

    TareaService.eliminarTarea(id, (err, cambios) => {

        if (err) {

            if (err.tipo === "VALIDACION") {
                return res.status(400).json({
                    error: err.mensaje
                });
            }

            return res.status(500).json({
                error: err.message || err.mensaje
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


// Exportar funciones
module.exports = {

    obtenerTareas,
    obtenerTareaPorId,
    crearTarea,
    actualizarTarea,
    eliminarTarea

};