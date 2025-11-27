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