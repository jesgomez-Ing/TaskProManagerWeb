// ===============================
// CARGAR DASHBOARD
// ===============================

async function cargarDashboard() {

    try {

        // Obtener usuarios
        const respuestaUsuarios =
            await fetch(API_URL + "/usuarios");

        const usuarios =
            await respuestaUsuarios.json();


        document.getElementById("totalUsuarios").textContent =
            usuarios.length;


        // Obtener tareas
        const respuestaTareas =
            await fetch(API_URL + "/tareas");

        const tareas =
            await respuestaTareas.json();


        document.getElementById("totalTareas").textContent =
            tareas.length;


        // Tareas pendientes
        const pendientes =
            tareas.filter(function(tarea) {

                return tarea.estado === "Pendiente";

            });


        document.getElementById("totalPendientes").textContent =
            pendientes.length;


        // Tareas completadas
        const completadas =
            tareas.filter(function(tarea) {

                return tarea.estado === "Completada";

            });


        document.getElementById("totalFinalizadas").textContent =
            completadas.length;


    } catch (error) {

        console.error(
            "Error al cargar el dashboard:",
            error
        );

    }

}



// ===============================
// ELEMENTOS DEL MENÚ
// ===============================

const menuDashboard =
    document.getElementById("menuDashboard");

const menuUsuarios =
    document.getElementById("menuUsuarios");

const menuTareas =
    document.getElementById("menuTareas");


// Secciones
const dashboard =
    document.getElementById("dashboard");

const moduloUsuarios =
    document.getElementById("moduloUsuarios");

const moduloTareas =
    document.getElementById("moduloTareas");



// ===============================
// ACTIVAR OPCIÓN DEL MENÚ
// ===============================

function activarMenu(menuActivo) {

    document
        .querySelectorAll("nav a")
        .forEach(function(opcion) {

            opcion.classList.remove("active");

        });


    menuActivo.classList.add("active");

}



// ===============================
// MOSTRAR DASHBOARD
// ===============================

menuDashboard.addEventListener(
    "click",
    function(evento) {

        evento.preventDefault();


        dashboard.style.display = "block";

        moduloUsuarios.style.display = "none";

        moduloTareas.style.display = "none";


        activarMenu(menuDashboard);


        cargarDashboard();

    }
);



// ===============================
// MOSTRAR USUARIOS
// ===============================

menuUsuarios.addEventListener(
    "click",
    function(evento) {

        evento.preventDefault();


        dashboard.style.display = "none";

        moduloUsuarios.style.display = "block";

        moduloTareas.style.display = "none";


        activarMenu(menuUsuarios);


        obtenerUsuarios();

    }
);



// ===============================
// MOSTRAR TAREAS
// ===============================

menuTareas.addEventListener(
    "click",
    function(evento) {

        evento.preventDefault();


        dashboard.style.display = "none";

        moduloUsuarios.style.display = "none";

        moduloTareas.style.display = "block";


        activarMenu(menuTareas);


        obtenerTareas();

    }
);



// ===============================
// BOTÓN CREAR TAREA DEL DASHBOARD
// ===============================

const btnCrearTareaDashboard =
    document.getElementById(
        "btnCrearTareaDashboard"
    );


if (btnCrearTareaDashboard) {

    btnCrearTareaDashboard.addEventListener(
        "click",
        function() {

            dashboard.style.display = "none";

            moduloUsuarios.style.display = "none";

            moduloTareas.style.display = "block";


            activarMenu(menuTareas);


            document.getElementById(
                "btnNuevaTarea"
            ).click();

        }
    );

}



// ===============================
// INICIAR DASHBOARD
// ===============================

cargarDashboard();
