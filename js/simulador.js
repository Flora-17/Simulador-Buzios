
const equipajeBase = ["documentos", "ropa ligera","traje de baño","protector solar"];
let dias, presupuesto, mes;


function pedirDatos() {
    dias = parseInt(prompt("¿Cuántos días vas a estar en Buzios?"));
    presupuesto = parseFloat(prompt("¿Cuál es tu presupuesto total en reales (R$)?"));
    mes = prompt("¿En qué mes vas a viajar? (escribí el mes en minúsculas)");
}


function analizarPresupuesto() {
    const diario = presupuesto / dias;
    console.log("Presupuesto diario: R$${diario.toFixed(2)}");

    if (diario < 100) {
        alert("Presupuesto ajustado. Búzios se puede disfrutar igual con paseos gratuitos y playas públicas");
    } else if (diario >= 100 && diario < 250) {
        alert("Presupuesto medio. ¡Podes hacer paseos, comer afuera y disfrutar de muchas cosas");
} else {
    alert("¡Presupuesto alto! Aprovechá para paseos en barco, gastronomía y excursiones");
}
}


function sugerirActividades() {
    let actividades = [];

    switch (mes.toLowerCase()) {
        case "enero":
        case "febrero":
        actividades = ["ir a la playa temprano","tour en barco","fiestas nocturnas"];
        break;
        case "junio":
        case "julio":
            actividades = ["caminatas", "paseo por Rua das Pedras", "visita a los miradores"];
            break;
        case "septiembre":
        case "octubre":
            actividades = ["disfrutar clima templado", "snorkel", "playas menos concurridas"];
            break;
            default:
                actividades = ["disfrutar de las playas", "probar comida local","visitar el centro"];

    }
    alert("Actividades sugeridas para" + mes + ":\n\n" + actividades.join("\n"));
    console.log("Actividades sugeridas", actividades);

}


function recomendarEquipaje() {
    const incluirExtra = confirm("¿Querés recomendaciones extras según el mes?");
    if (incluirExtra && (mes === "junio" || mes === "julio")) {
        equipajeBase.push("abrigo liviano", "repelente");
    } else if (incluirExtra) {
        equipajeBase.push("gafas de sol", "sandalias");
    }
    alert("Equipaje recomendado:\n\n" + equipajeBase.join("\n"));
    console.log("Equipaje recomendado:", equipajeBase);
    }

    
    
    pedirDatos();
    analizarPresupuesto();
    sugerirActividades();
    recomendarEquipaje();



