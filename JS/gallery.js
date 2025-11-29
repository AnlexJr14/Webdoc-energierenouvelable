// Récupération des éléments du DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

// --- CORRECTION 1 : DÉCALAGE INITIAL ---
// On déplace immédiatement la première miniature à la fin.
// Cela permet que la 1ère miniature visible soit celle de l'image SUIVANTE,
// et non celle de l'image actuelle.
thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

let timeRunning = 3000; // Temps de l'animation CSS (doit correspondre à votre CSS)


let isRunning = false; 

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}

let runTimeOut;
let runNextAuto = nextDom.click();

function showSlider(type){
    // Si une animation est déjà en cours, on ne fait rien (évite que les images sautent)
    if(isRunning) return;
    isRunning = true;

    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        // On déplace le premier élément à la fin
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        // On déplace le dernier élément au début
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    
    // Gestion de la fin de l'animation
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
        // On libère le verrou, l'utilisateur peut cliquer à nouveau
        isRunning = false;
    }, timeRunning);

    // Gestion du timer automatique
    clearTimeout(runNextAuto);
    runNextAuto = nextDom.click();
}