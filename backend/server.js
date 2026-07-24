const express = require("express");
const cors = require("cors");
const db = require("./database/database");

const usuarioRoutes = require("./routes/usuarioRoutes");
const tareaRoutes = require("./routes/tareaRoutes");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Activar llaves foráneas
db.run("PRAGMA foreign_keys = ON");

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

// Ruta principal
app.get("/", (req, res) => {
    res.send("Bienvenido a TaskPro Manager API");
});

// Rutas
app.use("/usuarios", usuarioRoutes);
app.use("/tareas", tareaRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
