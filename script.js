// Variable pour limiter le déclenchement de la musique à une seule fois
let musicTriggered = false;

function startEffects() {
    startMassiveFireworks(); // Lancement des feux d'artifice
    updateProposalText(); // Mise à jour du texte et des boutons
    if (!musicTriggered) {
        musicTriggered = true; // Assure que la musique commence seulement une fois
        playMusicFromSpecificTime(208); // Démarre la musique à 3:28
    }
}

// Met à jour le texte et remplace les boutons par des cœurs
function updateProposalText() {
    const proposalText = document.getElementById('proposal-text');
    if (proposalText) {
        proposalText.textContent = "On est mariés pour la vie maintenant ❤️";
    }

    // Remplace les boutons par des cœurs qui conservent les fonctionnalités
    const buttonsContainer = document.querySelector('.message-container');
    if (buttonsContainer) {
        buttonsContainer.innerHTML = `
            <button class="heart-button" onclick="startEffects()">❤️</button>
            <button class="heart-button" onclick="startEffects()">❤️</button>
        `;
    }
}

// Lance la musique à un moment spécifique
function playMusicFromSpecificTime(startTime) {
    const music = document.getElementById('background-music');
    music.currentTime = startTime; // Définit le point de départ de la musique
    music.play();

    // Lorsque la musique atteint sa fin, elle redémarre depuis le début
    music.addEventListener('ended', () => {
        music.currentTime = 0; // Réinitialise au début
        music.play(); // Rejoue depuis le début
    });
}

// Feux d'artifice massifs en forme de cœurs
function startMassiveFireworks() {
    const canvas = document.getElementById('fireworks-canvas');
    const ctx = canvas.getContext('2d');
    const particles = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function createFirework(x, y) {
        const redIntensity = Math.floor(Math.random() * 155 + 100); // Couleurs rouges vibrantes
        const color = `rgba(${redIntensity}, 0, 0, 1)`;
        for (let i = 0; i < 300; i++) {
            particles.push({
                x,
                y,
                dx: (Math.random() - 0.5) * 9, // Ajustement de la vitesse
                dy: (Math.random() - 0.5) * 9,
                color,
                size: Math.random() * 10 + 6, // Particules grandes pour être visibles
                life: 300, // Durée de vie prolongée pour une animation fluide
                brightness: Math.random() * 50 + 50 // Effet de brillance
            });
        }
    }

    function drawHeart(x, y, size, color) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(size / 10, size / 10);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-5, -5, -10, 5, 0, 10);
        ctx.bezierCurveTo(10, 5, 5, -5, 0, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, index) => {
            drawHeart(p.x, p.y, p.size, p.color); // Dessine des cœurs
            ctx.globalAlpha = p.brightness / 100; // Ajoute un effet de brillance

            p.x += p.dx;
            p.y += p.dy;
            p.life -= 1;

            if (p.life <= 0) particles.splice(index, 1); // Supprime les particules terminées
        });
    }

    function animateParticles() {
        drawParticles();
        if (particles.length > 0) requestAnimationFrame(animateParticles); // Animation fluide et régulière
    }

    for (let i = 0; i < 20; i++) { // Génère 20 feux d'artifice simultanés
        const randomX = Math.random() * canvas.width; // Position aléatoire sur toute la largeur
        const randomY = canvas.height / 2 + (Math.random() - 0.5) * 200; // Centré verticalement avec une légère variation
        createFirework(randomX, randomY);
    }

    animateParticles(); // Lance l'animation des particules
}

// Contrôle musique : Bouton reste fonctionnel
function toggleMusic() {
    const music = document.getElementById('background-music');
    const controlButton = document.getElementById('music-control');
    if (music.paused) {
        music.play(); // Active la musique
        controlButton.textContent = "🔊"; // Change l'icône du bouton
    } else {
        music.pause(); // Coupe la musique
        controlButton.textContent = "🔇"; // Change l'icône du bouton
    }
}
