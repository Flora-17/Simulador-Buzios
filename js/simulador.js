document.addEventListener("DOMContentLoaded", () => {


  // 🧾 FORMULARIO Y PASOS
  const form = document.getElementById("form-viaje");
  const paso1 = document.getElementById("paso-1");
  const paso2 = document.getElementById("paso-2");
  const btnSiguiente = document.getElementById("btn-siguiente");
  const btnVolver = document.getElementById("btn-volver");
  const resultado = document.getElementById("resultado");
  const btnVerResultado = document.getElementById("btn-ver-resultado");

fetch("data/prestadores.json")
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById("prestadores");
    const lista = document.getElementById("lista-prestadores");
    lista.innerHTML = data.map(p => `
      <li class="list-group-item">
        <strong>${p.nombre}</strong> - ${p.servicio}<br>
        <small>📧 ${p.contacto}</small>
      </li>
    `).join("");
    contenedor.style.display = "block";
  })
  .catch(error => {
    console.error("Error al cargar prestadores:", error);
  });

  // Paso 1 → Paso 2
  btnSiguiente?.addEventListener("click", () => {
    const mes = document.getElementById("mes").value;
    const dias = parseInt(document.getElementById("dias").value);

    if (!mes || !dias || dias <= 0) {
      mostrarToast("Por favor completá todos los campos del paso 1");
      return;
    }

    paso1.classList.add("d-none");
    paso2.classList.remove("d-none");
  });

  // Paso 2 → Paso 1
  btnVolver?.addEventListener("click", () => {
    paso2.classList.add("d-none");
    paso1.classList.remove("d-none");
  });

  // SUBMIT FORMULARIO FINAL
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const mes = document.getElementById("mes").value;
    const dias = parseInt(document.getElementById("dias").value);
    const presupuesto = parseFloat(document.getElementById("presupuesto").value);
    const incluirExtra = document.getElementById("extra").checked;

    if (!presupuesto || presupuesto <= 0) {
      mostrarToast("Por favor ingresá un presupuesto válido");
      return;
    }

    const diario = presupuesto / dias;
    const actividades = sugerirActividades(mes);
    const equipaje = recomendarEquipaje(mes, incluirExtra);
    const mensaje = generarResumen(mes, dias, presupuesto, diario, actividades, equipaje);

    mostrarResultado(mensaje);
    mostrarToast("Itinerario generado con éxito ✅");
    btnVerResultado.style.display = "inline-block";
    guardarEnLocalStorage({ mes, dias, presupuesto, actividades, equipaje });

    btnVerResultado.addEventListener("click", () => {
      resultado.scrollIntoView({ behavior: "smooth" });
    });
  });

  // 🔁 MOSTRAR RESULTADO ANTERIOR
  const seccionAnterior = document.getElementById("anterior");
  const btnVerAnterior = document.getElementById("verAnterior");

  if (localStorage.getItem("viajeBuzios")) {
    seccionAnterior.style.display = "block";
  }
// Precargar datos si ya existen
const datosGuardados = localStorage.getItem("viajeBuzios");
if (datosGuardados) {
  const { mes, dias, presupuesto, incluirExtra } = JSON.parse(datosGuardados);
  document.getElementById("mes").value = mes;
  document.getElementById("dias").value = dias;
  document.getElementById("presupuesto").value = presupuesto;
  document.getElementById("extra").checked = incluirExtra || false;
}

  btnVerAnterior?.addEventListener("click", () => {
    const data = JSON.parse(localStorage.getItem("viajeBuzios"));
    const diario = data.presupuesto / data.dias;
    const mensaje = generarResumen(
      data.mes,
      data.dias,
      data.presupuesto,
      diario,
      data.actividades,
      data.equipaje
    );
    mostrarResultado(mensaje);
    resultado.scrollIntoView({ behavior: "smooth" });
  });
});

// 📌 FUNCIONES AUXILIARES
function sugerirActividades(mes) {
  switch (mes.toLowerCase()) {
    case "enero":
    case "febrero":
      return ["ir a la playa temprano", "tour en barco", "fiestas nocturnas"];
    case "junio":
    case "julio":
      return ["caminatas", "paseo por Rua das Pedras", "visita a los miradores"];
    case "septiembre":
    case "octubre":
      return ["disfrutar clima templado", "snorkel", "playas menos concurridas"];
    default:
      return ["disfrutar de las playas", "probar comida local", "visitar el centro"];
  }
}

function recomendarEquipaje(mes, incluirExtra) {
  const base = ["documentos", "ropa ligera", "traje de baño", "protector solar"];

  if (incluirExtra && (mes === "junio" || mes === "julio")) {
    base.push("abrigo liviano", "repelente");
  } else if (incluirExtra) {
    base.push("gafas de sol", "sandalias");
  }

  return base;
}

function generarResumen(mes, dias, presupuesto, diario, actividades, equipaje) {
  return `
    <h2>🌴 Simulador de viaje a Búzios 🌊</h2>
    <section>
      <h3>Datos de viaje</h3>
      <p><strong>Mes:</strong> ${mes}</p>
      <p><strong>Días:</strong> ${dias}</p>
      <p><strong>Presupuesto total:</strong> R$${presupuesto}</p>
      <p><strong>Presupuesto diario:</strong> R$${diario.toFixed(2)}</p>
      <p>${diario < 100
        ? "💸 Presupuesto ajustado: ideal para paseos gratuitos y playas."
        : diario < 250
        ? "💰 Presupuesto medio: podés darte algunos gustos."
        : "🤑 Presupuesto alto: excursiones, gastronomía y más."
      }</p>
    </section>
    <section>
      <h3>Actividades sugeridas</h3>
      <ul>
        ${actividades.map((a, i) => `<li>Día ${i + 1}: ${a}</li>`).join("")}
      </ul>
    </section>
    <section>
      <h3>Equipaje recomendado</h3>
      <ul>
        ${equipaje.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>
  `;
}

function mostrarResultado(html) {
  const resultado = document.getElementById("resultado");
  resultado.classList.remove("visible");
  resultado.innerHTML = html;
  void resultado.offsetWidth;
  resultado.classList.add("visible");
}

function guardarEnLocalStorage(data) {
  localStorage.setItem("viajeBuzios", JSON.stringify(data));
}

function mostrarToast(mensaje) {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: 'success',
    title: mensaje,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
}

