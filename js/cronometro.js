let horas = 0;
let minutos = 0;
let segundos = 0;
let intervalo = null;

// Función para iniciar el cronómetro
function iniciarCronometro() {
  horas = 0;
  minutos = 0;
  segundos = 0;
  intervalo = setInterval(() => {
    segundos++;
    if (segundos === 60) {
      segundos = 0;
      minutos++;
    }
    if (minutos === 60) {
      minutos = 0;
      horas++;
    }
    //console.log(obtenerTiempoCronometro());
    document.getElementById("progressText").innerHTML=obtenerTiempoCronometro()
  }, 1000);
}

// Función para detener el cronómetro
function detenerCronometro() {
  clearInterval(intervalo);
}

// Función para obtener el tiempo formateado
function obtenerTiempoCronometro() {
  const horasFormateadas = String(horas).padStart(2, '0');
  const minutosFormateados = String(minutos).padStart(2, '0');
  const segundosFormateados = String(segundos).padStart(2, '0');
  return `${horasFormateadas}:${minutosFormateados}:${segundosFormateados}`;
}

// Ejemplo de uso
//iniciarCronometro();

// Para detener el cronómetro, llama a detenerCronometro():
// detenerCronometro();
