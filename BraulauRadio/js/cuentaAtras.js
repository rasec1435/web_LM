// Fecha y hora de destino: 5 de diciembre de 2024 a las 11:40 en zona horaria española
const targetDate = new Date("2024-12-27T10:40:00Z"); // UTC, equivalente a 11:40 en España (CET)

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  // Cálculos de días, horas, minutos y segundos restantes
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Muestra el resultado en el elemento h2
  document.getElementById(
    "countdown"
  ).innerHTML = `${days} días ${hours} horas ${minutes} minutos ${seconds} segundos`;

  // Cuando la cuenta regresiva llegue a 0
  if (distance < 0) {
    clearInterval(countdownInterval);
    document.getElementById("countdown").innerHTML = "¡La fecha ha llegado!";
  }
}

// Actualiza el contador cada segundo
const countdownInterval = setInterval(updateCountdown, 1000);
