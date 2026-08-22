const UsuarioService = require("../services/UsuarioService");

// Obtener todos los usuarios
const obtenerUsuarios = (req, res) => {

    UsuarioService.obtenerUsuarios((err, usuarios) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(usuarios);

    });

};

// Obtener usuario por ID
const obtenerUsuarioPorId = (req, res) => {

    const id = req.params.id;

    UsuarioService.obtenerUsuarioPorId(id, (err, usuario) => {

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

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        res.json(usuario);

    });

};

// Crear usuario
const crearUsuario = (req, res) => {

    UsuarioService.crearUsuario(req.body, (err, id) => {

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
            mensaje: "Usuario creado correctamente",
            id: id
        });

    });

};

// Actualizar usuario
const actualizarUsuario = (req, res) => {

    const id = req.params.id;

    UsuarioService.actualizarUsuario(id, req.body, (err, cambios) => {

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
                mensaje: "Usuario no encontrado"
            });
        }

        res.json({
            mensaje: "Usuario actualizado correctamente"
        });

    });

};

// Eliminar usuario
const eliminarUsuario = (req, res) => {

    const id = req.params.id;

    UsuarioService.eliminarUsuario(id, (err, cambios) => {

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
                mensaje: "Usuario no encontrado"
            });
        }

        res.json({
            mensaje: "Usuario eliminado correctamente"
        });

    });

};

module.exports = {

    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario

};