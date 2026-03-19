// Referencias a elementos del DOM
const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreElement = document.getElementById("score");
const menuInicio = document.getElementById("menu-inicio");
const menuGameOver = document.getElementById("menu-gameover");
const finalScoreElement = document.getElementById("final-score");

// Variables de estado del juego
let score = 0;
let isPlaying = false;
let gameLoop; // Guardará el intervalo principal

/**
 * Inicia o reinicia el juego
 */
function startGame() {
    // 1. Resetear estados
    score = 0;
    isPlaying = true;
    scoreElement.innerText = "Puntos: 0";
    
    // 2. Ocultar menús
    menuInicio.classList.add("hidden");
    menuGameOver.classList.add("hidden");
    
    // 3. Posicionar cactus al inicio
    cactus.style.left = "600px";

    // 4. Lanzar el bucle lógico (cada 10ms)
    // Limpiamos cualquier intervalo previo por seguridad
    if (gameLoop) clearInterval(gameLoop); 
    
    gameLoop = setInterval(() => {
        moverCactus();
        revisarColision();
    }, 10);
}

/**
 * Maneja el movimiento del obstáculo
 */
function moverCactus() {
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    if (cactusLeft < -30) {
        // El cactus salió de la pantalla: reinicia y suma puntos
        cactus.style.left = "600px";
        score++;
        scoreElement.innerText = `Puntos: ${score}`;
    } else {
        // Velocidad base 8 + bono por puntuación (se vuelve más rápido)
        let velocidad = 8 + Math.floor(score / 10); 
        cactus.style.left = (cactusLeft - velocidad) + "px";
    }
}

/**
 * Lógica de salto del dinosaurio
 */
function jump() {
    // Solo saltar si el juego está activo y no está ya saltando
    if (isPlaying && !dino.classList.contains("jump-animation")) {
        dino.classList.add("jump-animation");
        
        // Remover la clase después de que termine la animación (500ms)
        setTimeout(() => {
            dino.classList.remove("jump-animation");
        }, 500);
    }
}

/**
 * Verifica si el dino y el cactus se tocan
 */
function revisarColision() {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    // El dino está en el área horizontal del cactus (entre 20px y 50px)
    // Y el dino está lo suficientemente bajo (top >= 160px significa que no saltó)
    if (cactusLeft > 0 && cactusLeft < 50 && dinoTop >= 160) {
        finalizarJuego();
    }
}

/**
 * Detiene el juego y muestra el menú de Game Over
 */
function finalizarJuego() {
    isPlaying = false;
    clearInterval(gameLoop); // Detiene el movimiento del cactus inmediatamente
    
    finalScoreElement.innerText = score;
    menuGameOver.classList.remove("hidden");
}

// --- EVENTOS DE CONTROL ---

// Saltar con la tecla Espacio
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        jump();
    }
});

// Saltar con click en la pantalla
document.addEventListener("mousedown", () => {
    jump();
});