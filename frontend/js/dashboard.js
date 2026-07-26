async function cargarDashboard() {

    try {

        // Usuarios
        const respuestaUsuarios = await fetch(`${API_URL}/usuarios`);
        const usuarios = await respuestaUsuarios.json();

        document.getElementById("totalUsuarios").textContent = usuarios.length;

        // Tareas
        const respuestaTareas = await fetch(`${API_URL}/tareas`);
        const tareas = await respuestaTareas.json();

        document.getElementById("totalTareas").textContent = tareas.length;

        // Pendientes
        const pendientes = tareas.filter(t => t.estado === "Pendiente");

        document.getElementById("totalPendientes").textContent = pendientes.length;

        // Finalizadas
        const finalizadas = tareas.filter(t => t.estado === "Finalizada");

        document.getElementById("totalFinalizadas").textContent = finalizadas.length;

    } catch (error) {

        console.error("Error:", error);

    }

}

const menuDashboard = document.getElementById("menuDashboard");
const menuUsuarios = document.getElementById("menuUsuarios");

const dashboard = document.getElementById("dashboard");
const moduloUsuarios = document.getElementById("moduloUsuarios");

function activarMenu(menuActivo){

    document.querySelectorAll("nav a").forEach(opcion=>{

        opcion.classList.remove("active");

    });

    menuActivo.classList.add("active");

}

menuDashboard.addEventListener("click", function (e) {

    e.preventDefault();

    dashboard.style.display = "block";
    moduloUsuarios.style.display = "none";

    activarMenu(menuDashboard);

});

menuUsuarios.addEventListener("click", function (e) {

    e.preventDefault();

    dashboard.style.display = "none";
    moduloUsuarios.style.display = "block";

    activarMenu(menuUsuarios);

    obtenerUsuarios();

});
cargarDashboard();