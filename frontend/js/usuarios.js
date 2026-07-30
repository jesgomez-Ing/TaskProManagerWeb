let listaUsuarios = [];

async function obtenerUsuarios() {

    try {

        const respuesta = await fetch(`${API_URL}/usuarios`);
        const usuarios = await respuesta.json();
        listaUsuarios = usuarios;

        console.log("Usuarios:", usuarios);

        mostrarUsuarios(listaUsuarios);

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
async function guardarUsuario() {

    const nombre = document.getElementById("nombreUsuario").value.trim();
    const correo = document.getElementById("correoUsuario").value.trim();
    const rol = document.getElementById("rolUsuario").value.trim();

    if (!nombre || !correo || !rol) {

        alert("Todos los campos son obligatorios.");
        return;

    }

    const nuevoUsuario = {

        nombre,
        correo,
        rol

    };

    try {

        const respuesta = await fetch(`${API_URL}/usuarios`, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(nuevoUsuario)

        });

        if (!respuesta.ok) {

            throw new Error("No fue posible guardar el usuario.");

        }

        obtenerUsuarios();

        document.getElementById("modalUsuario").style.display = "none";

        document.getElementById("nombreUsuario").value = "";
        document.getElementById("correoUsuario").value = "";
        document.getElementById("rolUsuario").value = "";

        alert("Usuario creado correctamente.");

    } catch (error) {

        console.error(error);
        alert("Ocurrió un error al crear el usuario.");

    }

}

obtenerUsuarios();

const inputBuscar = document.getElementById("buscarUsuario");

inputBuscar.addEventListener("input", function () {

    const texto = inputBuscar.value.toLowerCase();

    const usuariosFiltrados = listaUsuarios.filter(usuario =>

        usuario.nombre.toLowerCase().includes(texto) ||
        usuario.correo.toLowerCase().includes(texto)

    );

    mostrarUsuarios(usuariosFiltrados);

});
// ==========================================
// MODAL USUARIO
// ==========================================

const btnNuevoUsuario = document.getElementById("btnNuevoUsuario");

const modalUsuario = document.getElementById("modalUsuario");

const btnCancelarModal = document.getElementById("cancelarModal");

btnNuevoUsuario.addEventListener("click", () => {

    modalUsuario.style.display = "flex";

});

btnCancelarModal.addEventListener("click", () => {

    modalUsuario.style.display = "none";

});
const btnGuardarUsuario = document.getElementById("guardarUsuario");

btnGuardarUsuario.addEventListener("click", guardarUsuario);