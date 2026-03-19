/**
 * JUEGO DEL DINOSAURIO
 * Incluye: Imágenes personalizadas + Dificultad progresiva + Menús originales
 */

// 1. REFERENCIAS AL DOM
const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreElement = document.getElementById("score");
const menuInicio = document.getElementById("menu-inicio");
const menuGameOver = document.getElementById("menu-gameover");
const finalScoreElement = document.getElementById("final-score");

// 2. SISTEMA DE IMÁGENES (Tu parte)
const dinoImg = new Image();
dinoImg.src = "https://imgs.search.brave.com/HFgcIw3mxQsYvsDQHPMwWKHOSfRonKPYHJ0ITNbcKaY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzRhL2E2/LzVhLzRhYTY1YTU0/MTMxMjRkMGI1YzMz/OTk5YTRkYjUxNjJl/LmpwZw"; 

const cactusImg = new Image();
cactusImg.src = "https://imgs.search.brave.com/RGwHYv58JtTHMQrxCy5soA8w3Lne6WLeD0owPNDdHag/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mbHlj/bGlwYXJ0LmNvbS90/aHVtYnMvY2FjdHVz/LXNpbHVldGEtMTY5/MDc2NS5wbmc";

// Inyectar imágenes en los contenedores al cargar
dinoImg.onload = () => { 
    dino.innerHTML = ""; 
    dino.appendChild(dinoImg); 
};
cactusImg.onload = () => { 
    cactus.innerHTML = ""; 
    cactus.appendChild(cactusImg); 
};

// 3. VARIABLES DE ESTADO
let score = 0;
let isPlaying = false;
let gameLoop;

/**
 * Inicia o reinicia el juego (Merge de ambas lógicas)
 */
function startGame() {
    score = 0;
    isPlaying = true;
    scoreElement.innerText = "Puntos: 0";
    
    // Ocultar menús
    menuInicio.classList.add("hidden");
    menuGameOver.classList.add("hidden");
    
    // Posición inicial del obstáculo
    cactus.style.left = "600px";

    // Limpiar intervalo previo por seguridad
    if (gameLoop) clearInterval(gameLoop); 
    
    // Bucle principal (cada 10ms)
    gameLoop = setInterval(() => {
        moverCactus();
        revisarColision();
    }, 10);
}

/**
 * Maneja el movimiento con dificultad progresiva (Lógica del compañero)
 */
function moverCactus() {
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    if (cactusLeft < -30) {
        // Reiniciar cactus y sumar puntos
        cactus.style.left = "600px";
        score++;
        scoreElement.innerText = `Puntos: ${score}`;
    } else {
        // DIFICULTAD: Velocidad base 8 + 1 extra por cada 10 puntos
        let velocidad = 8 + Math.floor(score / 10); 
        cactus.style.left = (cactusLeft - velocidad) + "px";
    }
}

/**
 * Lógica de salto (Tu animación)
 */
function jump() {
    if (isPlaying && !dino.classList.contains("jump-animation")) {
        dino.classList.add("jump-animation");
        
        setTimeout(() => {
            dino.classList.remove("jump-animation");
        }, 500);
    }
}

/**
 * Verifica colisión (Tu lógica de bottom + medidas de seguridad)
 */
function revisarColision() {
    let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    // Hitbox optimizada para los sprites actuales
    // Si el cactus está pasando por el área del dino (entre 50px y 90px)
    // Y el dino está a menos de 40px de altura del suelo
    if (cactusLeft > 50 && cactusLeft < 90 && dinoBottom < 40) {
        finalizarJuego();
    }
}

/**
 * Detiene el juego y muestra Game Over
 */
function finalizarJuego() {
    isPlaying = false;
    clearInterval(gameLoop);
    
    finalScoreElement.innerText = score;
    menuGameOver.classList.remove("hidden");
}

// 4. EVENTOS DE CONTROL
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        // Si el juego no ha empezado y el menú de inicio está visible, iniciar.
        // Si el juego ya empezó, saltar.
        if (!isPlaying && !menuInicio.classList.contains("hidden")) {
            startGame();
        } else {
            jump();
        }
    }
});

document.addEventListener("mousedown", () => {
    if (!isPlaying && !menuInicio.classList.contains("hidden")) {
        startGame();
    } else {
        jump();
    }
});