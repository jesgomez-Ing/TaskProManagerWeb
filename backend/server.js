const express = require("express");
const cors = require("cors");
const db = require("./database/database");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bienvenido a TaskPro Manager API");
});

db.run(`
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    correo TEXT UNIQUE NOT NULL,
    rol TEXT NOT NULL
)
`);
app.get("/usuarios", (req, res) => {

    console.log("Entró al GET /usuarios");
    
    db.all(
        "SELECT * FROM usuarios",
        [],
        (err, rows) => {

            if(err){
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json(rows);

        }
    );

});

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
app.post("/usuarios", (req, res) => {
    
    const {nombre, correo, rol} = req.body;

    const sql = `
    INSERT INTO usuarios(nombre, correo, rol)
    VALUES (?, ?, ?)
    `;
    db.run(sql, [nombre, correo, rol], function(err){
        
        if (err) {
            return res.status(500).json({error: err.message});
        }

        res.json({
            message: "Usuario creado exitosamente",
            id: this.lastID
        });
    });
});

console.log("Ruta POST /usuarios cargada");

app.listen(PORT, () => {
  console.log(`servidor ejecutándose en puerto ${PORT}`);
});

