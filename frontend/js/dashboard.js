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

cargarDashboard();