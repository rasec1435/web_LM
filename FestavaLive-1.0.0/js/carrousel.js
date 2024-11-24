const fila = document.querySelector('.contenedor-carousel');
const peliculas = document.querySelectorAll('.pelicula');

const flechaIzquierda = document.getElementById('flecha-izquierda');
const flechaDerecha = document.getElementById('flecha-derecha');

// ? ----- ----- Event Listener para la flecha derecha. ----- -----
flechaDerecha.addEventListener('click', () => {
	fila.scrollLeft += fila.offsetWidth;

	const indicadorActivo = document.querySelector('.indicadores .activo');
	if(indicadorActivo.nextSibling){
		indicadorActivo.nextSibling.classList.add('activo');
		indicadorActivo.classList.remove('activo');
	}
});

// ? ----- ----- Event Listener para la flecha izquierda. ----- -----
flechaIzquierda.addEventListener('click', () => {
	fila.scrollLeft -= fila.offsetWidth;

	const indicadorActivo = document.querySelector('.indicadores .activo');
	if(indicadorActivo.previousSibling){
		indicadorActivo.previousSibling.classList.add('activo');
		indicadorActivo.classList.remove('activo');
	}
});

// ? ----- ----- Paginacion ----- -----
const numeroPaginas = Math.ceil(peliculas.length / 5);
for(let i = 0; i < numeroPaginas; i++){
	const indicador = document.createElement('button');

	if(i === 0){
		indicador.classList.add('activo');
	}

	document.querySelector('.indicadores').appendChild(indicador);
	indicador.addEventListener('click', (e) => {
		fila.scrollLeft = i * fila.offsetWidth;

		document.querySelector('.indicadores .activo').classList.remove('activo');
		e.target.classList.add('activo');
	});
}

// ? ----- ----- Hover ----- -----
peliculas.forEach((pelicula) => {
	pelicula.addEventListener('mouseenter', (e) => {
		const elemento = e.currentTarget;
		setTimeout(() => {
			peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
			elemento.classList.add('hover');
		}, 300);
	});
});

fila.addEventListener('mouseleave', () => {
	peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
});

document.addEventListener('DOMContentLoaded', () => {
    const peliculas = document.querySelectorAll('.pelicula');

    peliculas.forEach(pelicula => {
        pelicula.addEventListener("click", function (e) {
            e.preventDefault();
            const videoSrc = this.getAttribute("data-video");

            // Crear un overlay para el video
            const videoOverlay = document.createElement('div');
            videoOverlay.classList.add('video-overlay');
            videoOverlay.innerHTML = `
                <div class="video-content" style="position: relative; width: 90%; max-width: 800px;">
                    <button class="close-btn" style="position: absolute; top: 10px; right: 10px; background: #ffffff; color: #000; font-size: 24px; border: none; cursor: pointer; padding: 5px 10px; border-radius: 50%; z-index: 2002;">&times;</button>
                    <video controls autoplay style="width: 100%; height: auto;">
                        <source src="${videoSrc}" type="video/mp4">
                        Tu navegador no soporta el elemento de video.
                    </video>
                </div>
            `;

            // Añadir el overlay al body
            document.body.appendChild(videoOverlay);

            // Añadir evento para cerrar el video
            const closeButton = videoOverlay.querySelector('.close-btn');
            closeButton.addEventListener('click', () => {
                document.body.removeChild(videoOverlay);
            });

            // Añadir evento para cerrar con tecla ESC
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    if (document.body.contains(videoOverlay)) {
                        document.body.removeChild(videoOverlay);
                    }
                }
            });
        });
    });
});
