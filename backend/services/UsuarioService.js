const UsuarioModel = require("../models/usuarioModel");
const jwt = require("jsonwebtoken");

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
    if (!usuario.password || !usuario.password.trim()) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "La contraseña del usuario es obligatoria"
        });
    }

    if (usuario.password.length < 6) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "La contraseña debe tener mínimo 6 caracteres"
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
    if (!usuario.password || !usuario.password.trim()) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "La contraseña del usuario es obligatoria"
        });
    }

    if (usuario.password.length < 6) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "La contraseña debe tener mínimo 6 caracteres"
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
// Iniciar sesión
const login = (correo, password, callback) => {

    // Validar correo
    if (!correo || !correo.trim()) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "El correo es obligatorio"
        });
    }

    // Validar contraseña
    if (!password || !password.trim()) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "La contraseña es obligatoria"
        });
    }

    // Buscar usuario por correo
    UsuarioModel.obtenerUsuarioPorCorreo(correo, (err, usuario) => {

        if (err) {
            return callback(err);
        }

        // Si no existe el usuario
        if (!usuario) {
            return callback({
                tipo: "AUTENTICACION",
                mensaje: "Correo o contraseña incorrectos"
            });
        }

        // Validar contraseña
        if (usuario.password !== password) {
            return callback({
                tipo: "AUTENTICACION",
                mensaje: "Correo o contraseña incorrectos"
            });
        }

        // Crear token JWT
        const token = jwt.sign(
            {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            },
            "CLAVE_SECRETA_TASKPRO",
            {
                expiresIn: "2h"
            }
        );

        // Devolver usuario y token
        callback(null, {
            mensaje: "Inicio de sesión exitoso",
            token: token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }
        });

    });

};
module.exports = {

    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    login

};
