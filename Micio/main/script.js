const images = ["pic/dogs/pic1.png", "pic/dogs/pic2.png", "pic/dogs/pic3.png"];
const catImages = ["pic/cats/pic1.png", "pic/cats/pic2.png", "pic/cats/pic3.png"];
let lives = 3;
let score = 0;
let interval;
let catInterval;
let fallSpeedMultiplier = 1;
const gameArea = document.getElementById('game-area');
const livesDisplay = document.getElementById('lives');
const scoreDisplay = document.getElementById('score');

// Aggiorna il numero di vite
function updateLives() {
    if (lives > 0) {
        lives--;
        const lifeImages = livesDisplay.querySelectorAll('.life');
        if (lifeImages[lives]) {
            lifeImages[lives].remove();
        }
    }

    if (lives <= 0) {
        setTimeout(() => {
            alert(`Hai Perso, Punteggio: ${score}, Clicca ok per continuare`);
            window.location.reload();
        }, 100);
        clearInterval(interval);
        clearInterval(catInterval);
    }
}

// Aggiorna il punteggio e velocità ogni 10 punti
function updateScore() {
    scoreDisplay.textContent = score;

    if (score > 0 && score % 10 === 0) {
        fallSpeedMultiplier += 0.1;
    }
}

// Crea una nuova immagine che cade
function createFallingImage() {
    const img = document.createElement('img');
    img.src = images[Math.floor(Math.random() * images.length)];
    img.classList.add('falling-image');
    img.style.left = Math.random() * (window.innerWidth - 80) + 'px';
    img.style.top = '-80px';
    gameArea.appendChild(img);

    let fallSpeed = (Math.random() * 2 + 3) * fallSpeedMultiplier;
    const fallInterval = setInterval(() => {
        img.style.top = parseFloat(img.style.top) + fallSpeed + 'px';

        if (parseFloat(img.style.top) > window.innerHeight) {
            clearInterval(fallInterval);
            gameArea.removeChild(img);
            updateLives();
        }
    }, 30);

    img.addEventListener('click', () => {
        clearInterval(fallInterval);
        gameArea.removeChild(img);
        score++;
        updateScore();
    });
}

// Crea un gatto che cade
function createFallingCat() {
    const img = document.createElement('img');
    img.src = catImages[Math.floor(Math.random() * catImages.length)];
    img.classList.add('falling-image');
    img.style.left = Math.random() * (window.innerWidth - 80) + 'px';
    img.style.top = '-80px';
    gameArea.appendChild(img);

    let fallSpeed = (Math.random() * 2 + 3) * fallSpeedMultiplier;
    const fallInterval = setInterval(() => {
        img.style.top = parseFloat(img.style.top) + fallSpeed + 'px';

        if (parseFloat(img.style.top) > window.innerHeight) {
            clearInterval(fallInterval);
            gameArea.removeChild(img);
            // Non chiamare updateLives() per i gatti se toccano il suolo
        }
    }, 30);

    img.addEventListener('click', () => {
        clearInterval(fallInterval);
        gameArea.removeChild(img);
        updateLives(); // Solo cliccando si perde una vita
    });
}

// Genera un'immagine (cane) cadente ogni secondo
interval = setInterval(createFallingImage, 1000);

// Genera un'immagine (gatto) cadente ogni 2 secondi
catInterval = setInterval(createFallingCat, 2000);
