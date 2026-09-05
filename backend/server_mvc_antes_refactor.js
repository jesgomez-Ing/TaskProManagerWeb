const express = require("express");
const cors = require("cors");
const db = require("./database/database");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Activar llaves foráneas en SQLite
db.run("PRAGMA foreign_keys = ON");

// Ruta principal
app.get("/", (req, res) => {
    res.send("Bienvenido a TaskPro Manager API");
});

// Crear tablas
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            correo TEXT UNIQUE NOT NULL,
            rol TEXT NOT NULL
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS tareas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descripcion TEXT,
            prioridad TEXT,
            fecha_inicio TEXT,
            fecha_vencimiento TEXT,
            estado TEXT,
            responsable_id INTEGER,
            FOREIGN KEY (responsable_id) REFERENCES usuarios(id)
        )
    `);
});

// =======================
// CRUD USUARIOS
// =======================

// Consultar todos los usuarios
app.get("/usuarios", (req, res) => {
    const sql = "SELECT * FROM usuarios ORDER BY id DESC";

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(rows);
    });
});

// Consultar usuario por ID
app.get("/usuarios/:id", (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM usuarios WHERE id = ?";

    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (!row) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        res.json(row);
    });
});

// Crear usuario
app.post("/usuarios", (req, res) => {
    const { nombre, correo, rol } = req.body;

    if (!nombre || !correo || !rol) {
        return res.status(400).json({
            message: "Los campos nombre, correo y rol son obligatorios"
        });
    }

    const sql = `
        INSERT INTO usuarios(nombre, correo, rol)
        VALUES (?, ?, ?)
    `;

    db.run(sql, [nombre, correo, rol], function(err) {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.status(201).json({
            message: "Usuario creado exitosamente",
            id: this.lastID
        });
    });
});

// Actualizar usuario
app.put("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, correo, rol } = req.body;

    if (!nombre || !correo || !rol) {
        return res.status(400).json({
            message: "Los campos nombre, correo y rol son obligatorios"
        });
    }

    const sql = `
        UPDATE usuarios
        SET nombre = ?, correo = ?, rol = ?
        WHERE id = ?
    `;

    db.run(sql, [nombre, correo, rol, id], function(err) {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        res.json({
            message: "Usuario actualizado exitosamente"
        });
    });
});

// Eliminar usuario
app.delete("/usuarios/:id", (req, res) => {
    const { id } = req.params;

    db.run(
        "UPDATE tareas SET responsable_id = NULL WHERE responsable_id = ?",
        [id],
        (err) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            db.run("DELETE FROM usuarios WHERE id = ?", [id], function(err) {
                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                }

                if (this.changes === 0) {
                    return res.status(404).json({
                        message: "Usuario no encontrado"
                    });
                }

                res.json({
                    message: "Usuario eliminado exitosamente"
                });
            });
        }
    );
});

// =======================
// CRUD TAREAS
// =======================

// Consultar todas las tareas
app.get("/tareas", (req, res) => {
    const sql = `
        SELECT 
            tareas.id,
            tareas.titulo,
            tareas.descripcion,
            tareas.prioridad,
            tareas.fecha_inicio,
            tareas.fecha_vencimiento,
            tareas.estado,
            tareas.responsable_id,
            usuarios.nombre AS responsable
        FROM tareas
        LEFT JOIN usuarios ON tareas.responsable_id = usuarios.id
        ORDER BY tareas.id DESC
    `;

    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(rows);
    });
});

// Consultar tarea por ID
app.get("/tareas/:id", (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT 
            tareas.id,
            tareas.titulo,
            tareas.descripcion,
            tareas.prioridad,
            tareas.fecha_inicio,
            tareas.fecha_vencimiento,
            tareas.estado,
            tareas.responsable_id,
            usuarios.nombre AS responsable
        FROM tareas
        LEFT JOIN usuarios ON tareas.responsable_id = usuarios.id
        WHERE tareas.id = ?
    `;

    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (!row) {
            return res.status(404).json({
                message: "Tarea no encontrada"
            });
        }

        res.json(row);
    });
});

// Crear tarea
app.post("/tareas", (req, res) => {
    const {
        titulo,
        descripcion,
        prioridad,
        fecha_inicio,
        fecha_vencimiento,
        estado,
        responsable_id
    } = req.body;

    if (!titulo) {
        return res.status(400).json({
            message: "El campo titulo es obligatorio"
        });
    }

    const sql = `
        INSERT INTO tareas (
            titulo,
            descripcion,
            prioridad,
            fecha_inicio,
            fecha_vencimiento,
            estado,
            responsable_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
        sql,
        [
            titulo,
            descripcion || "",
            prioridad || "Media",
            fecha_inicio || "",
            fecha_vencimiento || "",
            estado || "Pendiente",
            responsable_id || null
        ],
        function(err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.status(201).json({
                message: "Tarea creada exitosamente",
                id: this.lastID
            });
        }
    );
});

// Actualizar tarea
app.put("/tareas/:id", (req, res) => {
    const { id } = req.params;

    const {
        titulo,
        descripcion,
        prioridad,
        fecha_inicio,
        fecha_vencimiento,
        estado,
        responsable_id
    } = req.body;

    if (!titulo) {
        return res.status(400).json({
            message: "El campo titulo es obligatorio"
        });
    }

    const sql = `
        UPDATE tareas
        SET 
            titulo = ?,
            descripcion = ?,
            prioridad = ?,
            fecha_inicio = ?,
            fecha_vencimiento = ?,
            estado = ?,
            responsable_id = ?
        WHERE id = ?
    `;

    db.run(
        sql,
        [
            titulo,
            descripcion || "",
            prioridad || "Media",
            fecha_inicio || "",
            fecha_vencimiento || "",
            estado || "Pendiente",
            responsable_id || null,
            id
        ],
        function(err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    message: "Tarea no encontrada"
                });
            }

            res.json({
                message: "Tarea actualizada exitosamente"
            });
        }
    );
});

// Eliminar tarea
app.delete("/tareas/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM tareas WHERE id = ?";

    db.run(sql, [id], function(err) {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                message: "Tarea no encontrada"
            });
        }

        res.json({
            message: "Tarea eliminada exitosamente"
        });
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
