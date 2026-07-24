const db = require("../database/database");

// Obtener todos los usuarios
const obtenerUsuarios = (callback) => {
    const sql = "SELECT * FROM usuarios ORDER BY id DESC";
    db.all(sql, [], callback);
};

// Obtener usuario por ID
const obtenerUsuarioPorId = (id, callback) => {
    const sql = "SELECT * FROM usuarios WHERE id = ?";
    db.get(sql, [id], callback);
};

// Crear usuario
const crearUsuario = (usuario, callback) => {
    const sql = `
        INSERT INTO usuarios (nombre, correo, rol)
        VALUES (?, ?, ?)
    `;

    db.run(
        sql,
        [usuario.nombre, usuario.correo, usuario.rol],
        function (err) {
            callback(err, this.lastID);
        }
    );
};

// Actualizar usuario
const actualizarUsuario = (id, usuario, callback) => {
    const sql = `
        UPDATE usuarios
        SET nombre = ?, correo = ?, rol = ?
        WHERE id = ?
    `;

    db.run(
        sql,
        [usuario.nombre, usuario.correo, usuario.rol, id],
        function (err) {
            callback(err, this.changes);
        }
    );
};

// Eliminar usuario
const eliminarUsuario = (id, callback) => {
    db.run(
        "DELETE FROM usuarios WHERE id = ?",
        [id],
        function (err) {
            callback(err, this.changes);
        }
    );
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};
