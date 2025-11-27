document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        // Basculer l'affichage du menu
        nav.classList.toggle('nav-active');
        
        // Animation optionnelle du burger (croix)
        burger.classList.toggle('toggle');
    });
});