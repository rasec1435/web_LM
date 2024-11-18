function playPause(audioId, buttonId) {
    var audio = document.getElementById(audioId);
    var playPauseBTN = document.getElementById(buttonId);

    if (audio.paused) {
        audio.play();
        playPauseBTN.innerHTML = "&#9208"; // Cambia el botón a "⏸️"
    } else {
        audio.pause();
        playPauseBTN.innerHTML = "▶️"; // Cambia el botón a "▶️"
    }
}
