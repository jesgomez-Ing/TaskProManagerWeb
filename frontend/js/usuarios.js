let usuarios = [];
let usuarioEditando = null;



async function obtenerUsuarios() {
    try {
        const respuesta = await fetch(API_URL + "/usuarios");

        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener los usuarios");
        }

        usuarios = await respuesta.json();

        mostrarUsuarios(usuarios);

    } catch (error) {
        console.error(error);
        alert("Error al cargar los usuarios");
    }
}



function mostrarUsuarios(lista) {

    const tabla = document.getElementById("tablaUsuarios");

    tabla.innerHTML = "";

    lista.forEach(function(usuario) {

        const fila = document.createElement("tr");

        fila.innerHTML =
            "<td>" + usuario.id + "</td>" +
            "<td>" + usuario.nombre + "</td>" +
            "<td>" + usuario.correo + "</td>" +
            "<td>" + usuario.rol + "</td>" +
            "<td>" +
                "<button class='btn-editar' data-id='" + usuario.id + "'>Editar</button>" +
                "<button class='btn-eliminar' data-id='" + usuario.id + "'>Eliminar</button>" +
            "</td>";

        tabla.appendChild(fila);
    });


    // Botones editar
    const botonesEditar = document.querySelectorAll(".btn-editar");

    botonesEditar.forEach(function(boton) {

        boton.addEventListener("click", function() {

            const id = Number(this.getAttribute("data-id"));

            editarUsuario(id);

        });

    });


    // Botones eliminar
    const botonesEliminar = document.querySelectorAll(".btn-eliminar");

    botonesEliminar.forEach(function(boton) {

        boton.addEventListener("click", function() {

            const id = Number(this.getAttribute("data-id"));

            eliminarUsuario(id);

        });

    });
}



async function guardarUsuario() {

    const nombre = document.getElementById("nombreUsuario").value.trim();
    const correo = document.getElementById("correoUsuario").value.trim();
    const rol = document.getElementById("rolUsuario").value;


    if (nombre === "" || correo === "" || rol === "") {

        alert("Todos los campos son obligatorios");

        return;
    }


    const datos = {
        nombre: nombre,
        correo: correo,
        rol: rol
    };


    try {

        let respuesta;


        // ACTUALIZAR
        if (usuarioEditando !== null) {

            respuesta = await fetch(
                API_URL + "/usuarios/" + usuarioEditando,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datos)
                }
            );

        }

        // CREAR
        else {

            respuesta = await fetch(
                API_URL + "/usuarios",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datos)
                }
            );

        }


        const resultado = await respuesta.json();


        if (!respuesta.ok) {

            throw new Error(
                resultado.error ||
                resultado.mensaje ||
                "Error al guardar usuario"
            );

        }


        if (usuarioEditando !== null) {

            alert("Usuario actualizado correctamente");

        } else {

            alert("Usuario creado correctamente");

        }


        cerrarModal();

        await obtenerUsuarios();

    } catch (error) {

        console.error(error);

        alert(error.message);

    }
}



function editarUsuario(id) {

    const usuario = usuarios.find(function(usuario) {

        return Number(usuario.id) === Number(id);

    });


    if (!usuario) {

        alert("Usuario no encontrado");

        return;
    }


    usuarioEditando = id;


    document.getElementById("nombreUsuario").value = usuario.nombre;

    document.getElementById("correoUsuario").value = usuario.correo;

    document.getElementById("rolUsuario").value = usuario.rol;


    document.querySelector("#modalUsuario h2").textContent =
        "Editar Usuario";


    document.getElementById("modalUsuario").style.display = "flex";
}



async function eliminarUsuario(id) {

    const usuario = usuarios.find(function(usuario) {

        return Number(usuario.id) === Number(id);

    });


    if (!usuario) {

        alert("Usuario no encontrado");

        return;
    }


    const confirmar = confirm(
        "¿Desea eliminar al usuario " + usuario.nombre + "?"
    );


    if (!confirmar) {

        return;
    }


    try {

        const respuesta = await fetch(
            API_URL + "/usuarios/" + id,
            {
                method: "DELETE"
            }
        );


        const resultado = await respuesta.json();


        if (!respuesta.ok) {

            throw new Error(
                resultado.error ||
                resultado.mensaje ||
                "No se pudo eliminar el usuario"
            );

        }


        alert("Usuario eliminado correctamente");


        await obtenerUsuarios();

    } catch (error) {

        console.error(error);

        alert(error.message);

    }
}



function cerrarModal() {

    document.getElementById("modalUsuario").style.display = "none";


    document.getElementById("nombreUsuario").value = "";

    document.getElementById("correoUsuario").value = "";

    document.getElementById("rolUsuario").value = "";


    usuarioEditando = null;


    document.querySelector("#modalUsuario h2").textContent =
        "Nuevo Usuario";
}



document.getElementById("btnNuevoUsuario").addEventListener(
    "click",
    function() {

        usuarioEditando = null;


        document.getElementById("nombreUsuario").value = "";

        document.getElementById("correoUsuario").value = "";

        document.getElementById("rolUsuario").value = "";


        document.querySelector("#modalUsuario h2").textContent =
            "Nuevo Usuario";


        document.getElementById("modalUsuario").style.display = "flex";

    }
);



document.getElementById("cancelarModal").addEventListener(
    "click",
    function() {

        cerrarModal();

    }
);



document.getElementById("guardarUsuario").addEventListener(
    "click",
    function() {

        guardarUsuario();

    }
);



document.getElementById("buscarUsuario").addEventListener(
    "input",
    function() {

        const texto = this.value.toLowerCase();


        const resultados = usuarios.filter(function(usuario) {

            return (
                usuario.nombre.toLowerCase().includes(texto) ||
                usuario.correo.toLowerCase().includes(texto) ||
                usuario.rol.toLowerCase().includes(texto)
            );

        });


        mostrarUsuarios(resultados);

    }
);



obtenerUsuarios();