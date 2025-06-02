//URL de la API
const API_URL = "https://retoolapi.dev/GMew04/data" ;

//funcion que manda a traer el JSON
async function obtenerPersonas() {
    //Respuesta del servidor
    const res = await fetch(API_URL)//Se hace una llamada a la endpoint

    //pasamos a JSON la respuesta del servidor
    const data = await res.json();//Esto es un JSON

    //Enviamos el JSON que nos manda la API a la función que crea la tabla en HTML
    mostrarDatos(data);
}

//La funcion lleva un parametro "datos" que representa al JSON
function mostrarDatos(datos){
    //Se llama al tbody dentro del elemento con id "tabla"
    const tabla = document.querySelector('#tabla tbody');
    tabla.innerHTML = '';//Vaciamos el contenido de la tabla

    datos.forEach(persona => {
        tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>${persona.email}</td>
                <td>${persona.edad}</td>
                <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                </td>
            </tr>
        `
    });
}

//LLamada inicial para que se carguen los datos que vienen del servidor
obtenerPersonas();





//Agregar un nuevo registro
const modal = document.getElementById("modal-agregar");//Cuadro de dialogo
const btnAgregar = document.getElementById("btnAbrirModal");//+ para abrir
const btnCerrar = document.getElementById("btnCerrarModal");//x para cerrar

btnAgregar.addEventListener("click", () => {
    modal.showModal();//Abrir el modal al hacer clic en el botón
});

btnCerrar.addEventListener("click", () => {
    modal.close();
});

document.getElementById("frmAgregar").addEventListener("submit", async e => {
    e.preventDefault(); //"e" representa "submit" - Evita que el formulario se envíe de golpe

    //capturar los valores del formulario
    const nombre = document.getElementById("nombre").value.trim();

    const apellido = document.getElementById("apellido").value.trim();

    const email = document.getElementById("email").value.trim();

    const edad = document.getElementById("edad").value.trim();

    //Validación basica
    if(!nombre || !apellido || !email || !edad){
        alert("Complete todos los campos");
        return; //Evitar que al formulario se envie
    }

    //Llamar a la api para enviar el usuario
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombre, apellido, email, edad})
    });

    if(respuesta.ok){
        alert("El registro fue agregado correctamente");

        //Limpiar el formulario y cerrar el modal
        document.getElementById("frmAgregar").reset();

        modal.close();

        //Recargar la tabla
        obtenerPersonas();
    }
    else{
        alert("Hubo un error al agregar");
    }
});
