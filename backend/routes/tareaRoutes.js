const express = require("express");
const router = express.Router();

const tareaController = require("../controllers/tareaController");

// Consultar todas las tareas
router.get("/", tareaController.obtenerTareas);

// Consultar tarea por ID
router.get("/:id", tareaController.obtenerTareaPorId);

// Crear tarea
router.post("/", tareaController.crearTarea);

// Actualizar tarea
router.put("/:id", tareaController.actualizarTarea);

// Eliminar tarea
router.delete("/:id", tareaController.eliminarTarea);

module.exports = router;
