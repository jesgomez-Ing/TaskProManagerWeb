let tareas = [];
let tareaEditando = null;


// ===============================
// OBTENER TAREAS
// ===============================
async function obtenerTareas() {

    try {

        const respuesta = await fetch(API_URL + "/tareas");

        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener las tareas");
        }

        tareas = await respuesta.json();

        mostrarTareas(tareas);

    } catch (error) {

        console.error(error);

        alert("Error al cargar las tareas");

    }

}


// ===============================
// MOSTRAR TAREAS
// ===============================
function mostrarTareas(lista) {

    const tabla = document.getElementById("tablaTareas");

    if (!tabla) {
        return;
    }

    tabla.innerHTML = "";


    lista.forEach(function(tarea) {

        const fila = document.createElement("tr");


        const responsable = tarea.responsable
            ? tarea.responsable
            : "Sin asignar";


        fila.innerHTML =
            "<td>" + tarea.id + "</td>" +
            "<td>" + tarea.titulo + "</td>" +
            "<td>" + (tarea.prioridad || "Sin definir") + "</td>" +
            "<td>" + (tarea.fecha_vencimiento || "Sin fecha") + "</td>" +
            "<td>" + tarea.estado + "</td>" +
            "<td>" + responsable + "</td>" +
            "<td>" +

                "<button class='btn-editar' data-id='" +
                tarea.id +
                "'>" +

                    "Editar" +

                "</button>" +

                "<button class='btn-eliminar' data-id='" +
                tarea.id +
                "'>" +

                    "Eliminar" +

                "</button>" +

            "</td>";


        tabla.appendChild(fila);

    });


    // ===============================
    // BOTONES EDITAR
    // ===============================

    const botonesEditar =
        tabla.querySelectorAll(".btn-editar");


    botonesEditar.forEach(function(boton) {

        boton.addEventListener("click", function() {

            const id =
                Number(this.getAttribute("data-id"));

            editarTarea(id);

        });

    });


    // ===============================
    // BOTONES ELIMINAR
    // ===============================

    const botonesEliminar =
        tabla.querySelectorAll(".btn-eliminar");


    botonesEliminar.forEach(function(boton) {

        boton.addEventListener("click", function() {

            const id =
                Number(this.getAttribute("data-id"));

            eliminarTarea(id);

        });

    });

}


// ===============================
// CARGAR USUARIOS RESPONSABLES
// ===============================
async function cargarResponsables() {

    try {

        const respuesta =
            await fetch(API_URL + "/usuarios");


        if (!respuesta.ok) {

            throw new Error(
                "No se pudieron cargar los usuarios"
            );

        }


        const usuarios =
            await respuesta.json();


        const select =
            document.getElementById("responsableTarea");


        select.innerHTML =
            "<option value=''>" +
            "Seleccionar responsable" +
            "</option>";


        usuarios.forEach(function(usuario) {

            const opcion =
                document.createElement("option");


            opcion.value = usuario.id;

            opcion.textContent =
                usuario.nombre;


            select.appendChild(opcion);

        });


    } catch (error) {

        console.error(error);

        alert("Error al cargar los responsables");

    }

}


// ===============================
// GUARDAR TAREA
// ===============================
async function guardarTarea() {

    const titulo =
        document.getElementById("tituloTarea").value.trim();


    const descripcion =
        document.getElementById("descripcionTarea").value.trim();


    const prioridad =
        document.getElementById("prioridadTarea").value;


    const fechaInicio =
        document.getElementById("fechaInicioTarea").value;


    const fechaVencimiento =
        document.getElementById("fechaVencimientoTarea").value;


    const estado =
        document.getElementById("estadoTarea").value;


    const responsable =
        document.getElementById("responsableTarea").value;


    // ===============================
    // VALIDACIONES
    // ===============================

    if (titulo === "") {

        alert("El título de la tarea es obligatorio");

        return;

    }


    if (descripcion === "") {

        alert("La descripción de la tarea es obligatoria");

        return;

    }


    if (estado === "") {

        alert("Debe seleccionar un estado");

        return;

    }


    // ===============================
    // DATOS
    // ===============================

    const datos = {

        titulo: titulo,

        descripcion: descripcion,

        prioridad: prioridad,

        fecha_inicio: fechaInicio,

        fecha_vencimiento: fechaVencimiento,

        estado: estado,

        responsable_id:
            responsable === ""
                ? null
                : Number(responsable)

    };


    try {

        let respuesta;


        // ===============================
        // ACTUALIZAR
        // ===============================

        if (tareaEditando !== null) {

            respuesta = await fetch(

                API_URL +
                "/tareas/" +
                tareaEditando,

                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(datos)

                }

            );

        }


        // ===============================
        // CREAR
        // ===============================

        else {

            respuesta = await fetch(

                API_URL + "/tareas",

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(datos)

                }

            );

        }


        const resultado =
            await respuesta.json();


        if (!respuesta.ok) {

            throw new Error(

                resultado.error ||
                resultado.mensaje ||
                "No se pudo guardar la tarea"

            );

        }


        if (tareaEditando !== null) {

            alert(
                "Tarea actualizada correctamente"
            );

        } else {

            alert(
                "Tarea creada correctamente"
            );

        }


        cerrarModalTarea();


        await obtenerTareas();


    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}


// ===============================
// EDITAR TAREA
// ===============================
async function editarTarea(id) {

    const tarea =
        tareas.find(function(tarea) {

            return Number(tarea.id) === Number(id);

        });


    if (!tarea) {

        alert("Tarea no encontrada");

        return;

    }


    tareaEditando = id;


    await cargarResponsables();


    document.getElementById("tituloTarea").value =
        tarea.titulo;


    document.getElementById("descripcionTarea").value =
        tarea.descripcion;


    document.getElementById("prioridadTarea").value =
        tarea.prioridad || "";


    document.getElementById("fechaInicioTarea").value =
        tarea.fecha_inicio || "";


    document.getElementById("fechaVencimientoTarea").value =
        tarea.fecha_vencimiento || "";


    document.getElementById("estadoTarea").value =
        tarea.estado;


    document.getElementById("responsableTarea").value =
        tarea.responsable_id || "";


    document.querySelector("#modalTarea h2").textContent =
        "Editar Tarea";


    document.getElementById("modalTarea").style.display =
        "flex";

}


// ===============================
// ELIMINAR TAREA
// ===============================
async function eliminarTarea(id) {

    const tarea =
        tareas.find(function(tarea) {

            return Number(tarea.id) === Number(id);

        });


    if (!tarea) {

        alert("Tarea no encontrada");

        return;

    }


    const confirmar =
        confirm(
            "¿Desea eliminar la tarea '" +
            tarea.titulo +
            "'?"
        );


    if (!confirmar) {

        return;

    }


    try {

        const respuesta =
            await fetch(

                API_URL +
                "/tareas/" +
                id,

                {

                    method: "DELETE"

                }

            );


        const resultado =
            await respuesta.json();


        if (!respuesta.ok) {

            throw new Error(

                resultado.error ||
                resultado.mensaje ||
                "No se pudo eliminar la tarea"

            );

        }


        alert(
            "Tarea eliminada correctamente"
        );


        await obtenerTareas();


    } catch (error) {

        console.error(error);

        alert(error.message);

    }

}


// ===============================
// CERRAR MODAL
// ===============================
function cerrarModalTarea() {

    document.getElementById(
        "modalTarea"
    ).style.display = "none";


    document.getElementById(
        "tituloTarea"
    ).value = "";


    document.getElementById(
        "descripcionTarea"
    ).value = "";


    document.getElementById(
        "prioridadTarea"
    ).value = "";


    document.getElementById(
        "fechaInicioTarea"
    ).value = "";


    document.getElementById(
        "fechaVencimientoTarea"
    ).value = "";


    document.getElementById(
        "estadoTarea"
    ).value = "";


    document.getElementById(
        "responsableTarea"
    ).value = "";


    tareaEditando = null;


    document.querySelector(
        "#modalTarea h2"
    ).textContent =
        "Nueva Tarea";

}


// ===============================
// NUEVA TAREA
// ===============================
document.getElementById(
    "btnNuevaTarea"
).addEventListener(
    "click",
    async function() {

        tareaEditando = null;


        await cargarResponsables();


        document.querySelector(
            "#modalTarea h2"
        ).textContent =
            "Nueva Tarea";


        document.getElementById(
            "modalTarea"
        ).style.display =
            "flex";

    }
);


// ===============================
// CANCELAR
// ===============================
document.getElementById(
    "cancelarModalTarea"
).addEventListener(
    "click",
    function() {

        cerrarModalTarea();

    }
);


// ===============================
// GUARDAR
// ===============================
document.getElementById(
    "guardarTarea"
).addEventListener(
    "click",
    function() {

        guardarTarea();

    }
);


// ===============================
// BUSCAR
// ===============================
document.getElementById(
    "buscarTarea"
).addEventListener(
    "input",
    function() {

        const texto =
            this.value.toLowerCase();


        const resultados =
            tareas.filter(function(tarea) {

                return (

                    tarea.titulo
                        .toLowerCase()
                        .includes(texto)

                    ||

                    tarea.descripcion
                        .toLowerCase()
                        .includes(texto)

                    ||

                    tarea.estado
                        .toLowerCase()
                        .includes(texto)

                );

            });


        mostrarTareas(resultados);

    }
);


// ===============================
// CARGAR TAREAS AL INICIAR
// ===============================
obtenerTareas();
