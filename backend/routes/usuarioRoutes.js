const express = require("express");
const router = express.Router();

const UsuarioController = require("../controllers/usuarioController");

// Consultar usuarios
router.get("/", UsuarioController.obtenerUsuarios);

// Consultar usuario por ID
router.get("/:id", UsuarioController.obtenerUsuarioPorId);

// Crear usuario
router.post("/", UsuarioController.crearUsuario);

// Actualizar usuario
router.put("/:id", UsuarioController.actualizarUsuario);

// Eliminar usuario
router.delete("/:id", UsuarioController.eliminarUsuario);

module.exports = router;
