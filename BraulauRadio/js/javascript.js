function copiarEnlace() {
    // Define el enlace que quieres copiar
    const enlace = "https://brauluradio.vercel.app/"; // Cambia por el enlace que desees compartir

    // Usa la API del portapapeles para copiar el enlace
    navigator.clipboard.writeText(enlace).then(() => {
        mostrarToast();
    }).catch(err => {
        console.error("Error al copiar el enlace: ", err);
    });
}

function mostrarToast() {
    const toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000); // La notificación desaparecerá después de 2 segundos
}