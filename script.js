document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    // Configuración para 5 celdas (basado en tu CSS)
    const cellCount = 5;
    const angle = 360 / cellCount; // 72 grados por celda
    let selectedIndex = 0;

    // --- FUNCIÓN DE ROTACIÓN (Ajustada para usar la profundidad Z) ---
    function rotateCarousel() {
        const rotation = selectedIndex * -angle;
        // CORRECCIÓN 1: Aplicamos la profundidad (translateZ) usando la variable CSS --radius
        // para centrar correctamente el carrusel 3D.
        carousel.style.transform = `translateZ(calc(var(--radius) * -1)) rotateY(${rotation}deg)`;
    }

    // 🔑 CORRECCIÓN 3: HABILITAR EL CLIC EN LAS IMÁGENES/ENLACES
    const imageLinks = document.querySelectorAll('.carousel__cell .image-link');

    imageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Detiene la propagación del evento, asegurando que el clic no sea
            // interpretado como un comando de rotación del carrusel.
            e.stopPropagation();
        });
    });

    // --- MANEJADORES DE BOTONES (Ajustados para navegación circular) ---
    prevButton.addEventListener('click', () => {
        selectedIndex--;
        // CORRECCIÓN 2: Navegación circular
        if (selectedIndex < 0) {
            selectedIndex = cellCount - 1;
        }
        rotateCarousel();
    });

    nextButton.addEventListener('click', () => {
        selectedIndex++;
        // CORRECCIÓN 2: Navegación circular
        if (selectedIndex >= cellCount) {
            selectedIndex = 0;
        }
        rotateCarousel();
    });

    // Inicializa la rotación para mostrar la primera celda
    rotateCarousel();
});
