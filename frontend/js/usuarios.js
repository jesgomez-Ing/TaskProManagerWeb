
async function obtenerUsuarios() {

    try {

        const respuesta = await fetch(`${API_URL}/usuarios`);
        const usuarios = await respuesta.json();

        console.log("Usuarios:", usuarios);

        mostrarUsuarios(usuarios);

    } catch (error) {

        console.error("Error al consultar usuarios:", error);

    }

}

function mostrarUsuarios(listaUsuarios) {

    const tabla = document.getElementById("tablaUsuarios");

    if (!tabla) return;

    tabla.innerHTML = "";

    listaUsuarios.forEach(usuario => {

    tabla.innerHTML += `
        <tr>

            <td>${usuario.id}</td>

            <td>
                <strong>${usuario.nombre}</strong>
            </td>

            <td>${usuario.correo}</td>

            <td>
                <span class="badge-rol">
                    ${usuario.rol}
                </span>
            </td>

            <td>

                <button class="btn-editar">

                    <i class="fa-solid fa-pen-to-square"></i>

                    Editar

                </button>

                <button class="btn-eliminar">

                    <i class="fa-solid fa-trash"></i>

                    Eliminar

                </button>

            </td>

        </tr>
    `;

});
}

obtenerUsuarios();