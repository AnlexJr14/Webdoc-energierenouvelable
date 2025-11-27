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