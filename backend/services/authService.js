const UsuarioModel = require("../models/usuarioModel");

// Autenticar usuario
const login = (correo, password, callback) => {

    // Validar campos obligatorios
    if (!correo || !correo.trim()) {
        return callback({
            tipo: "VALIDACION",
            mensaje: "El correo es obligatorio"
        });
    }

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

        // Verificar que el usuario exista
        if (!usuario) {
            return callback({
                tipo: "AUTENTICACION",
                mensaje: "Credenciales incorrectas"
            });
        }

        // Verificar contraseña
        if (usuario.password !== password) {
            return callback({
                tipo: "AUTENTICACION",
                mensaje: "Credenciales incorrectas"
            });
        }

        // Autenticación correcta
        callback(null, usuario);

    });

};

module.exports = {
    login
};