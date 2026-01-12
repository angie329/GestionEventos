/* =========================================================
   Angie Alfonso - Comienzo
   ========================================================= */


/* =========================================================
   URL del backend (API REST en Laravel)
   ========================================================= */
const API_BASE_URL = "http://127.0.0.1:8000/api";

/* =========================================================
   Esta sección es para la tarejtita de vista previa que sale
   al estar creando un nuevo evento
   ========================================================= */
function initVistaPrevia() {
    const inputs = {
        titulo: document.getElementById("titulo"),
        fecha: document.getElementById("fecha"),
        cupos: document.getElementById("cupos"),
        desc: document.getElementById("descripcion"),
        ubicacion: document.getElementById("ubicacion")
    };

    const previews = {
        titulo: document.getElementById("p-titulo"),
        fecha: document.getElementById("p-fecha"),
        cupos: document.getElementById("p-cupos"),
        desc: document.getElementById("p-desc"),
        ubicacion: document.getElementById("p-ubicacion")
    };

    /* si no existe el formulario entonces no ejecuta la vista previa */
    if (!inputs.titulo) return;

    const actualizar = () => {
        previews.titulo.textContent = inputs.titulo.value || "(Título)";
        previews.desc.textContent = inputs.desc.value || "(Descripción...)";
        previews.cupos.textContent = inputs.cupos.value || "0";
        previews.fecha.textContent = inputs.fecha.value || "Fecha";
        previews.ubicacion.textContent = inputs.ubicacion.value || "Ubicación";
    };

    Object.values(inputs).forEach(el =>
        el.addEventListener("input", actualizar)
    );
}

/* =========================================================
   POST - PARA EL ENVIO DEL FORMULARIO
   ========================================================= */
const formEvento = document.getElementById("formEvento");

if (formEvento) {
    initVistaPrevia();

    formEvento.addEventListener("submit", async (e) => {
        e.preventDefault();

        const btn = document.getElementById("btnPublicar");
        btn.disabled = true;
        btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Publicando...`;

        const datos = {
            titulo: document.getElementById("titulo").value,
            descripcion: document.getElementById("descripcion").value,
            fecha: document.getElementById("fecha").value,
            cupos: parseInt(document.getElementById("cupos").value),
            ubicacion: document.getElementById("ubicacion").value
        };

        try {
            const res = await fetch(`${API_BASE_URL}/eventos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });

            if (res.ok) {
                document.getElementById("mensaje").innerHTML =
                    `<span style="color:var(--accent)">¡Evento publicado con éxito!</span>`;

                formEvento.reset();

                setTimeout(() => {
                    window.location.href = "eventos.html";
                }, 1500);
            }
        } catch (error) {
            document.getElementById("mensaje").textContent =
                "Error de conexión con el servidor.";
        } finally {
            btn.disabled = false;
            btn.innerHTML = `<i class="fas fa-paper-plane"></i> Publicar evento`;
        }
    });
}

/* =========================================================
   GET - PARA OBTENER LOS LISTADOS DE LOS EVENTOS
   ========================================================= */
const contenedorEventos = document.getElementById("featured-events");

async function cargarEventos() {
    if (!contenedorEventos) return;

    try {
        const res = await fetch(`${API_BASE_URL}/eventos`);
        const eventos = await res.json();

        contenedorEventos.innerHTML = "";

        eventos.forEach(evento => {
            const card = document.createElement("div");
            card.className = "evento-card";

            const fechaFormateada = new Date(evento.fecha).toLocaleDateString(
                "es-ES",
                { day: "numeric", month: "long", year: "numeric" }
            );

            card.innerHTML = `
                <div class="flex-between-start" style="margin-bottom: 1rem;">
                    <span class="badge-academico">Académico</span>
                    <span class="id-badge">ID: #${evento.id}</span>
                </div>

                <h3 style="margin-bottom: 0.75rem;">${evento.titulo}</h3>

                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">
                    ${evento.descripcion}
                </p>

                <div style="border-top: 1px solid var(--border); padding-top: 1.2rem;">
                    <div class="info-item">
                        <i class="fas fa-map-marker-alt"></i> ${evento.ubicacion}
                    </div>
                    <div class="info-item">
                        <i class="fas fa-calendar-alt"></i> ${fechaFormateada}
                    </div>
                    <div class="info-item">
                        <i class="fas fa-users"></i> ${evento.cupos} Cupos
                    </div>
                    <div style="margin-top: 1.2rem; text-align: center; border-top: 1px dashed var(--border); padding-top: 1rem;">
                        <a href="editar.html?id=${evento.id}" style="color: var(--accent); text-decoration: none; font-weight: 600;">
                            <i class="fas fa-edit"></i> Editar Evento
                        </a>
                    </div>
                    <div style="margin-top: 1.2rem; text-align: center; border-top: 1px dashed var(--border); padding-top: 1rem;">
                        <a href="inscritos.html?id=${evento.id}" style="color: var(--accent); text-decoration: none; font-weight: 600;">
                            <i class="fas fa-users"></i> Ver Inscritos
                        </a>
                    </div>
                </div>
            `;

            contenedorEventos.appendChild(card);
        });

    } catch (error) {
        contenedorEventos.innerHTML =
            "<p>Error al cargar los eventos.</p>";
    }
}

if (contenedorEventos) {
    cargarEventos();
}

/* =========================================================
   Angie Alfonso - Fin
   ========================================================= */

/* =========================================================
   Bryan Zhang - Comienzo
   ========================================================= */
const formEditorEvento = document.getElementById("formEditarEvento");
console.log(formEditorEvento);

if (formEditorEvento) {
    (async () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const eventoId = urlParams.get("id");
            if (eventoId) {
                await cargarevento(eventoId);
            } else {
                console.warn("No se encontró el ID del evento en la URL.");
            }
        } catch (error) {
            console.error("Error al inicializar la carga del evento:", error);
        }
        initVistaPrevia();
        const inputTitulo = document.getElementById("titulo");
        if (inputTitulo) {
            inputTitulo.dispatchEvent(new Event('input'));
        }
    })();
    formEditorEvento.addEventListener("submit", async (e) => {
        e.preventDefault();
        const btn = document.getElementById("btnEditar");
        btn.disabled = true;
        btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Editando...`;
        const urlParams = new URLSearchParams(window.location.search);
        const eventoId = urlParams.get("id");
        const datos = {
            titulo: document.getElementById("titulo").value,
            descripcion: document.getElementById("descripcion").value,
            fecha: document.getElementById("fecha").value,
            cupos: parseInt(document.getElementById("cupos").value),
            ubicacion: document.getElementById("ubicacion").value
        };
        try {
            const res = await fetch(`${API_BASE_URL}/eventos/${eventoId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });
            if (res.ok) {
                document.getElementById("mensaje").innerHTML =
                    `<span style="color:var(--accent)">¡Evento editado con éxito!</span>`;
                setTimeout(() => {
                    window.location.href = "eventos.html";
                }, 1500);
            }
        } catch (error) {
            document.getElementById("mensaje").textContent =
                "Error de conexión con el servidor.";
        } finally {
            btn.disabled = false;
            btn.innerHTML = `<i class="fas fa-paper-plane"></i> Confirmar Edición`;
        }
    });
}

async function cargarevento(id) {
    try {
        const res = await fetch(`${API_BASE_URL}/eventos/${id}`);
        
        if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
        }

        const evento = await res.json();

        const ids = ["titulo", "descripcion", "fecha", "cupos", "ubicacion"];

        ids.forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                const valor = evento[key] || "";
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
                    element.value = valor;
                } else {
                    element.textContent = valor; 
                }
            }
        });

    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
}

/* =========================================================
   Ventana de inscritos al evento
   ========================================================= */
const contenedorInscritos = document.getElementById("inscritos");

if(contenedorInscritos){
    (async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventoId = urlParams.get("id");

    if (eventoId) {
        await Promise.all([
            cargarevento(eventoId),
            cargarInscritos(eventoId)
        ]);
    } else {
        console.warn("No hay ID en la URL");
        const titulo = document.getElementById("titulo-evento");
        if(titulo) titulo.textContent = "Seleccione un evento para ver detalles";
        
        const loader = document.getElementById("loader");
        if(loader) loader.style.display = "none";
    }
})();
}

async function cargarInscritos(eventoId) {
    const contenedor = document.getElementById("inscritos");
    if (!contenedor) return;

    try {
        const res = await fetch(`${API_BASE_URL}/eventos/${eventoId}/inscritos`);
        
        if (!res.ok) throw new Error("Error al obtener inscritos");
        
        const inscritos = await res.json();

        // Limpiar el loader
        contenedor.innerHTML = "";

        if (inscritos.length === 0) {
            contenedor.innerHTML = `<p class="mensaje-vacio">Aún no hay inscritos en este evento.</p>`;
            return;
        }

        // Crear tarjeta por cada inscrito
        inscritos.forEach(usuario => {
            const card = document.createElement("div");
            card.className = "inscrito-card"; // Clase para CSS
            
            // Asumiendo que la API devuelve { nombre, email, etc }
            card.innerHTML = `
                <div class="inscrito-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="inscrito-info">
                    <h4>${usuario.nombre || "Usuario"}</h4>
                    <p>${usuario.email || "Sin correo"}</p>
                </div>
            `;
            
            contenedor.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        contenedor.innerHTML = `<p class="error-msg">No se pudo cargar la lista de inscritos.</p>`;
    }
}


/* =========================================================
   Bryan Zhang - Fin
   ========================================================= */

/* =========================================================
   Inscribir a un usuario al evento (Botón)
   ========================================================= */
   const btnAgregar = document.getElementById("btn-agregar-inscrito");

if (btnAgregar) {
    btnAgregar.addEventListener("click", () => {
        // Aquí iría la lógica para abrir un formulario modal o redirigir a otra página
        
        console.log("TODO: Aquí debe ir la lógica para inscribir a alguien.");
        alert("Funcionalidad en desarrollo: Aquí se abrirá el formulario de inscripción.");
    });
}