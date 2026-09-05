const express = require("express");

const router = express.Router();

const tareaController = require("../controllers/tareaController");
const verificarToken = require("../middleware/authMiddleware");

// Consultar todas las tareas
router.get("/", verificarToken, tareaController.obtenerTareas);

// Consultar tarea por ID
router.get("/:id", verificarToken, tareaController.obtenerTareaPorId);

// Crear tarea
router.post("/", verificarToken, tareaController.crearTarea);

// Actualizar tarea
router.put("/:id", verificarToken, tareaController.actualizarTarea);

// Eliminar tarea
router.delete("/:id", verificarToken, tareaController.eliminarTarea);

module.exports = router;
