const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./taskpro_manager.db", (err) => {

    if(err){
        console.error("Error al conectar a la base de datos:", err.message);
    }else{
        console.log("Base de datos TaskPro Manager conectada.");
    }
});

module.exports = db;
