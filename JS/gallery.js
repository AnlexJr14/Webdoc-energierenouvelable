// Filtrage de la galerie
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Retirer la classe active de tous les boutons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    // Ajouter la classe active au bouton cliqué
    button.classList.add('active');
    
    const filter = button.getAttribute('data-filter');
    
    galleryItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 10);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxText = document.getElementById('lightboxText');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentImageIndex = 0;
let visibleImages = [];

// Fonction pour obtenir toutes les images visibles
function getVisibleImages() {
  return Array.from(galleryItems)
    .filter(item => item.style.display !== 'none')
    .map(item => ({
      src: item.querySelector('.gallery-image').src,
      title: item.querySelector('.gallery-item-title').textContent,
      caption: item.querySelector('.gallery-item-caption').textContent
    }));
}

// Ouvrir la lightbox
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    visibleImages = getVisibleImages();
    const clickedImage = item.querySelector('.gallery-image');
    const clickedTitle = item.querySelector('.gallery-item-title').textContent;
    const clickedCaption = item.querySelector('.gallery-item-caption').textContent;
    
    currentImageIndex = visibleImages.findIndex(img => 
      img.src === clickedImage.src
    );
    
    if (currentImageIndex === -1) currentImageIndex = 0;
    
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

// Mettre à jour le contenu de la lightbox
function updateLightbox() {
  if (visibleImages.length === 0) return;
  
  const image = visibleImages[currentImageIndex];
  lightboxImage.src = image.src;
  lightboxTitle.textContent = image.title;
  lightboxText.textContent = image.caption;
  
  // Afficher/masquer les boutons de navigation
  lightboxPrev.style.display = visibleImages.length > 1 ? 'block' : 'none';
  lightboxNext.style.display = visibleImages.length > 1 ? 'block' : 'none';
}

// Fermer la lightbox
lightboxClose.addEventListener('click', () => {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Navigation dans la lightbox
lightboxPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
  updateLightbox();
});

lightboxNext.addEventListener('click', (e) => {
  e.stopPropagation();
  currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
  updateLightbox();
});

// Navigation au clavier
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  
  if (e.key === 'Escape') {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  } else if (e.key === 'ArrowLeft') {
    currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
    updateLightbox();
  } else if (e.key === 'ArrowRight') {
    currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
    updateLightbox();
  }
});

// Animation au chargement
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

galleryItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(30px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(item);
});

console.log('[Galerie] Initialisée avec succès');

