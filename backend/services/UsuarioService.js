const UsuarioModel = require("../models/usuarioModel");

// Obtener todos los usuarios
const obtenerUsuarios = (callback) => {
    UsuarioModel.obtenerUsuarios(callback);
};

// Obtener usuario por ID
const obtenerUsuarioPorId = (id, callback) => {

    if (!id || isNaN(id)) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "El ID del usuario no es válido"
        });
    }

    UsuarioModel.obtenerUsuarioPorId(id, callback);
};

// Crear usuario
const crearUsuario = (usuario, callback) => {

    // Validar información obligatoria
    if (!usuario.nombre || !usuario.nombre.trim()) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "El nombre del usuario es obligatorio"
        });
    }

    if (!usuario.correo || !usuario.correo.trim()) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "El correo del usuario es obligatorio"
        });
    }

    if (!usuario.rol || !usuario.rol.trim()) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "El rol del usuario es obligatorio"
        });
    }

    // Validar formato básico del correo
    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!correoValido.test(usuario.correo)) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "El correo electrónico no tiene un formato válido"
        });
    }

    // Roles permitidos en TaskPro Manager
    const rolesPermitidos = [
    "Coordinador",
    "Administrativo",
    "Soporte",
    "Técnico"
];

    if (!rolesPermitidos.includes(usuario.rol)) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "El rol debe ser Coordinador, Administrativo, Soporte o Técnico"
        });
    }

    // Si todas las validaciones son correctas,
    // se delega el acceso a datos al modelo.
    UsuarioModel.crearUsuario(usuario, callback);
};

// Actualizar usuario
const actualizarUsuario = (id, usuario, callback) => {

    if (!id || isNaN(id)) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "El ID del usuario no es válido"
        });
    }

    if (!usuario.nombre || !usuario.nombre.trim()) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "El nombre del usuario es obligatorio"
        });
    }

    if (!usuario.correo || !usuario.correo.trim()) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "El correo del usuario es obligatorio"
        });
    }

    if (!usuario.rol || !usuario.rol.trim()) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "El rol del usuario es obligatorio"
        });
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!correoValido.test(usuario.correo)) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "El correo electrónico no tiene un formato válido"
        });
    }

    const rolesPermitidos = [
        "Coordinador",
        "Administrativo",
        "Soporte",
        "Técnico"
    ];

    if (!rolesPermitidos.includes(usuario.rol)) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "El rol debe ser Coordinador, Administrativo, Soporte o Técnico"
        });
    }

    UsuarioModel.actualizarUsuario(id, usuario, callback);
};

// Eliminar usuario
const eliminarUsuario = (id, callback) => {

    if (!id || isNaN(id)) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "El ID del usuario no es válido"
        });
    }

    UsuarioModel.eliminarUsuario(id, callback);
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};