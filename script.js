// Referencias
const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreElement = document.getElementById("score");
const menuInicio = document.getElementById("menu-inicio");
const menuGameOver = document.getElementById("menu-gameover");
const finalScoreElement = document.getElementById("final-score");

// Imágenes
const dinoImg = new Image();
dinoImg.src = "https://imgs.search.brave.com/HFgcIw3mxQsYvsDQHPMwWKHOSfRonKPYHJ0ITNbcKaY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzRhL2E2/LzVhLzRhYTY1YTU0/MTMxMjRkMGI1YzMz/OTk5YTRkYjUxNjJl/LmpwZw"; 

const cactusImg = new Image();
cactusImg.src = "https://imgs.search.brave.com/RGwHYv58JtTHMQrxCy5soA8w3Lne6WLeD0owPNDdHag/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mbHlj/bGlwYXJ0LmNvbS90/aHVtYnMvY2FjdHVz/LXNpbHVldGEtMTY5/MDc2NS5wbmc";

// Cargar imágenes en los divs
dinoImg.onload = () => { dino.innerHTML = ""; dino.appendChild(dinoImg); };
cactusImg.onload = () => { cactus.innerHTML = ""; cactus.appendChild(cactusImg); };

let score = 0;
let isPlaying = false;
let gameLoop;
let jumpDuration = 500; // duración inicial

function startGame() {
    score = 0;
    isPlaying = true;
    scoreElement.innerText = "Puntos: 0";
    
    menuInicio.classList.add("hidden");
    menuGameOver.classList.add("hidden");
    
    cactus.style.left = "600px";

    if (gameLoop) clearInterval(gameLoop); 
    
    gameLoop = setInterval(() => {
        moverCactus();
        revisarColision();
    }, 10);
}

function moverCactus() {
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    if (cactusLeft < -30) {
        cactus.style.left = "600px";
        score++;
        scoreElement.innerText = `Puntos: ${score}`;
    } else {
        let velocidad = 8 + Math.floor(score / 10); 
        cactus.style.left = (cactusLeft - velocidad) + "px";
        // Ajustar velocidad del salto en función del score
        jumpDuration = 500 - Math.floor(score / 10) * 20;

// Limitar para que no sea imposible
if (jumpDuration < 250) jumpDuration = 250;
    }
}

function jump() {
    if (isPlaying && !dino.classList.contains("jump-animation")) {

        // aplicar duración dinámica al CSS
        dino.style.animationDuration = jumpDuration + "ms";

        dino.classList.add("jump-animation");

        setTimeout(() => {
            dino.classList.remove("jump-animation");
        }, jumpDuration);
    }
}

function revisarColision() {
    let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    // Hitbox ajustada para el tamaño de la imagen (50px)
    if (cactusLeft > 50 && cactusLeft < 90 && dinoBottom < 40) {
        finalizarJuego();
    }
}

function finalizarJuego() {
    isPlaying = false;
    clearInterval(gameLoop);
    finalScoreElement.innerText = score;
    menuGameOver.classList.remove("hidden");
}

// Eventos
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        if (!isPlaying && !menuInicio.classList.contains("hidden")) startGame();
        else jump();
    }
});

document.addEventListener("mousedown", () => {
    if (!isPlaying && !menuInicio.classList.contains("hidden")) startGame();
    else jump();
});
