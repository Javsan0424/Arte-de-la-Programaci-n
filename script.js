/**
 * LÓGICA DEL DINO GAME
 * Documentado para facilitar el aprendizaje
 */

const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreElement = document.getElementById("score");

let score = 0;
let isGameOver = false;

/**
 * Función para ejecutar el salto
 * Agrega la clase CSS de animación y la quita al terminar
 */
function jump() {
    if (isGameOver) return; // Si perdió, no puede saltar

    // Verificamos que no tenga ya la clase para evitar "doble salto" en el aire
    if (!dino.classList.contains("jump-animation")) {
        dino.classList.add("jump-animation");
        
        // El tiempo (500ms) debe coincidir con la duración en el CSS
        setTimeout(() => {
            dino.classList.remove("jump-animation");
        }, 500);
    }
}

/**
 * Bucle principal del juego
 * Se ejecuta cada 10 milisegundos para detectar colisiones y mover el cactus
 */
let gameLoop = setInterval(() => {
    if (isGameOver) return;

    // 1. Obtener posiciones actuales
    // getComputedStyle nos da los valores reales de CSS en el momento exacto
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    // 2. Mover el cactus manualmente hacia la izquierda
    if (cactusLeft < -30) {
        // Si el cactus sale de la pantalla por la izquierda, lo reiniciamos a la derecha
        cactus.style.left = "600px";
        actualizarPuntaje();
    } else {
        // Velocidad del cactus: se resta 8px cada 10ms
        cactus.style.left = (cactusLeft - 8) + "px";
    }

    // 3. Lógica de Colisión (Matemática simple)
    // Si el cactus está entre X=20 y X=50 (zona del dino)
    // Y el dino NO está lo suficientemente alto (Y > 150px desde arriba)
    if (cactusLeft > 0 && cactusLeft < 50 && dinoTop >= 160) {
        gameOver();
    }

}, 10);

/**
 * Actualiza el marcador de puntos
 */
function actualizarPuntaje() {
    score++;
    scoreElement.innerText = `Puntos: ${score}`;
}

/**
 * Detiene el juego y alerta al usuario
 */
function gameOver() {
    isGameOver = true;
    alert(`¡GAME OVER! Puntuación final: ${score}`);
    // Recargar la página para reiniciar
    location.reload();
}

/**
 * Eventos de control: Tecla espacio o Click/Tap
 */
document.addEventListener("keydown", (event) => {
    if (event.code === "Space" || event.key === " ") {
        jump();
    }
});

document.addEventListener("mousedown", () => {
    jump();
});