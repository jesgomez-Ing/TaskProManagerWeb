const UsuarioModel = require("../models/usuarioModel");

// Obtener todos los usuarios
const obtenerUsuarios = (req, res) => {

    UsuarioModel.obtenerUsuarios((err, usuarios) => {

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

    UsuarioModel.obtenerUsuarioPorId(id, (err, usuario) => {

        if (err) {
            return res.status(500).json({
                error: err.message
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

    UsuarioModel.crearUsuario(req.body, (err, id) => {

        if (err) {
            return res.status(500).json({
                error: err.message
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

    UsuarioModel.actualizarUsuario(id, req.body, (err, cambios) => {

        if (err) {
            return res.status(500).json({
                error: err.message
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

    UsuarioModel.eliminarUsuario(id, (err, cambios) => {

        if (err) {
            return res.status(500).json({
                error: err.message
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
