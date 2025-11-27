const shareBtn = document.getElementById('shareTrigger');
const shareMenu = document.getElementById('shareMenu');

shareBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    shareMenu.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!shareMenu.contains(e.target) && !shareBtn.contains(e.target)) {
        shareMenu.classList.remove('active');
    }
});

function copierLien(bouton) {
    navigator.clipboard.writeText(window.location.href);

    const originalHTML = bouton.innerHTML;

    bouton.innerHTML = '<i class="fa-solid fa-check"></i> <span>Copié !</span>';
    bouton.classList.add('success');
    setTimeout(() => {
        bouton.innerHTML = originalHTML;
        bouton.classList.remove('success');
    }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. On récupère le bouton
    const btn = document.getElementById('readLaterBtn');

    // Sécurité : Si le bouton n'existe pas sur la page, on arrête le script pour éviter les erreurs
    if (!btn) return;

    const icon = btn.querySelector('i');
    
    // 2. C'est ici que la magie opère : on récupère l'identifiant unique (article_1, article_2, etc.)
    // que vous avez écrit dans le HTML
    const uniqueId = btn.getAttribute('data-id'); 
    
    // On crée une clé de sauvegarde unique : "save_article_1", "save_article_2", etc.
    const storageKey = 'save_' + uniqueId;

    // --- VÉRIFICATION AU CHARGEMENT ---
    const isSaved = localStorage.getItem(storageKey) === 'true';

    if (isSaved) {
        btn.classList.add('saved');
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
    }

    // --- GESTION DU CLIC ---
    btn.addEventListener('click', () => {
        btn.classList.toggle('saved');

        if (btn.classList.contains('saved')) {
            // Sauvegarder
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
            localStorage.setItem(storageKey, 'true');
        } else {
            // Enlever la sauvegarde
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
            localStorage.setItem(storageKey, 'false');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audioDoc');
    const playBtn = document.getElementById('playBtn');
    const iconPlay = document.getElementById('iconPlay');
    const iconPause = document.getElementById('iconPause');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const muteBtn = document.getElementById('muteBtn');

    if(audio) { // Vérifie si le lecteur existe sur la page
        // 1. Play / Pause
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                toggleIcons(true);
            } else {
                audio.pause();
                toggleIcons(false);
            }
        });

        function toggleIcons(isPlaying) {
            if (isPlaying) {
                iconPlay.style.display = 'none';
                iconPause.style.display = 'block';
                playBtn.classList.add('playing');
            } else {
                iconPlay.style.display = 'block';
                iconPause.style.display = 'none';
                playBtn.classList.remove('playing');
            }
        }

        // 2. Progression
        audio.addEventListener('timeupdate', () => {
            const current = audio.currentTime;
            const duration = audio.duration;
            
            if (!isNaN(duration)) {
                progress.value = (current / duration) * 100;
                currentTimeEl.textContent = formatTime(current);
                
                // Barre verte dynamique
                const val = (progress.value - progress.min) / (progress.max - progress.min) * 100;
                progress.style.background = `linear-gradient(to right, #2e5c46 ${val}%, #e0e0e0 ${val}%)`;
            }
        });

        // 3. Scrubbing (Déplacement manuel)
        progress.addEventListener('input', () => {
            const duration = audio.duration;
            audio.currentTime = (progress.value / 100) * duration;
            
            const val = (progress.value - progress.min) / (progress.max - progress.min) * 100;
            progress.style.background = `linear-gradient(to right, #2e5c46 ${val}%, #e0e0e0 ${val}%)`;
        });

        // 4. Mute / Unmute
        muteBtn.addEventListener('click', () => {
            audio.muted = !audio.muted;
            muteBtn.style.opacity = audio.muted ? '0.3' : '1';
        });

        // 5. Durée totale
        audio.addEventListener('loadedmetadata', () => {
            durationEl.textContent = formatTime(audio.duration);
        });
        
        // Reset à la fin
        audio.addEventListener('ended', () => {
            toggleIcons(false);
            progress.value = 0;
            progress.style.background = `linear-gradient(to right, #2e5c46 0%, #e0e0e0 0%)`;
        });

        function formatTime(seconds) {
            const min = Math.floor(seconds / 60);
            const sec = Math.floor(seconds % 60);
            return `${min}:${sec < 10 ? '0' : ''}${sec}`;
        }
    }
});