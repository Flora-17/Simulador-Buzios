

document.addEventListener("DOMContentLoaded", () => {
  const modoOscuroActivo = localStorage.getItem("modoOscuro") === "true";
  if (modoOscuroActivo) {
    document.body.classList.add("dark-mode");
    document.querySelector(".main-header")?.classList.add("dark-mode");
  }

  // Referencia al botón de cambio de tema
  const toggleBtn = document.getElementById("toggle-theme");
  toggleBtn?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".main-header")?.classList.toggle("dark-mode");
    localStorage.setItem("modoOscuro", document.body.classList.contains("dark-mode"));
  });
  const form = document.getElementById("form-viaje");
  const paso1 = document.querySelector(".paso-1");
const paso2 = document.querySelector(".paso-2");
const btnPaso1 = document.getElementById("btn-paso-1");
btnPaso1.addEventListener("click", () => {
  const mes = document.getElementById("mes").value;
  const dias = parseInt(document.getElementById("dias").value);
  const presupuesto = parseFloat(document.getElementById("presupuesto").value);

  if (!mes || !dias || !presupuesto) {
    mostrarToast("Por favor completá todos los campos del paso 1");
    return;
  }

  // Mostrar segundo paso
  paso1.style.display = "none";
  paso2.style.display = "block";
});

  const resultado = document.getElementById("resultado");
    const btnVerResultado = document.getElementById("btn-ver-resultado");


  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const mes = document.getElementById("mes").value;
    const dias = parseInt(document.getElementById("dias").value);
    const presupuesto = parseFloat(document.getElementById("presupuesto").value);
    const incluirExtra = document.getElementById("extra").checked;

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
const seccionAnterior = document.getElementById("anterior");
const btnVerAnterior = document.getElementById("verAnterior");

// Mostrar mensaje si ya hay datos en localStorage
if (localStorage.getItem("viajeBuzios")) {
  seccionAnterior.style.display = "block";
}

// Al hacer clic, mostrar el resultado guardado
btnVerAnterior?.addEventListener("click", () => {
  const data = JSON.parse(localStorage.getItem("viajeBuzios"))

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
  window.scrollTo({ top: document.getElementById("resultado").offsetTop, behavior: "smooth" });
});
});
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
      <p>${diario < 100 ? 
          "💸 Presupuesto ajustado: ideal para paseos gratuitos y playas." :
          diario < 250 ?
          "💰 Presupuesto medio: podés darte algunos gustos." :
          "🤑 Presupuesto alto: excursiones, gastronomía y más."
        }</p>
    </section>
    <section>
      <h3>Actividades sugeridas</h3>
      <ul>
        ${actividades.map((a, i) => `<li>Día ${i + 1}: ${a}</li>`).join('')}
      </ul>
    </section>
    <section>
      <h3>Equipaje recomendado</h3>
      <ul>
        ${equipaje.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </section>
  `;
}


function mostrarResultado(html) {
  resultado.classList.remove("visible");
  resultado.innerHTML = html;
  
  // Forzar reflow para reiniciar la animación
  void resultado.offsetWidth;

  resultado.classList.add("visible");
}



  function guardarEnLocalStorage(data) {
    localStorage.setItem("viajeBuzios", JSON.stringify(data));
  }
});
function mostrarToast(mensaje) {
  const toast = document.getElementById("toast");
  toast.textContent = mensaje;
  toast.classList.add("show");
  toast.style.display = "block";

  setTimeout(() => {
    toast.classList.remove("show");
    toast.style.display = "none";
  }, 3000); // se muestra por 3 segundos
}

