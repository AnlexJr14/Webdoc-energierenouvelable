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

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault()
		const target = document.querySelector(this.getAttribute("href"))
		if (target) {
			target.scrollIntoView({
				behavior: "smooth",
				block: "start",
			})
		}
	})
})

let lastScroll = 0
const navbar = document.getElementById("navbar")

window.addEventListener("scroll", () => {
	const currentScroll = window.pageYOffset

	if (currentScroll > 100) {
		if (currentScroll > lastScroll) {
			navbar.classList.remove("visible")
		} else {
			navbar.classList.add("visible")
		}
	} else {
		navbar.classList.remove("visible")
	}

	lastScroll = currentScroll
})

document.querySelector(".scroll-indicator")?.addEventListener("click", () => {
	window.scrollTo({
		top: window.innerHeight,
		behavior: "smooth",
	})
})

const observerOptions = {
	threshold: 0.1,
	rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("fade-in")
			observer.unobserve(entry.target)
		}
	})
}, observerOptions)

document.querySelectorAll(".data-card, .article, .stat-item, .cta-card").forEach((el) => {
	observer.observe(el)
})

window.addEventListener("scroll", () => {
	const scrolled = window.pageYOffset
	const hero = document.querySelector(".hero")
	if (hero && scrolled < window.innerHeight) {
		hero.style.backgroundPositionY = `${scrolled * 0.5}px`
	}
})

function animateCounter(element, target, duration) {
	let start = 0
	const increment = target / (duration / 16)

	const timer = setInterval(() => {
		start += increment
		if (start >= target) {
			element.textContent = target
			clearInterval(timer)
		} else {
			element.textContent = Math.floor(start)
		}
	}, 16)
}

const dataObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const number = entry.target.querySelector(".data-number")
				if (number && !number.classList.contains("animated")) {
					number.classList.add("animated")
				}
			}
		})
	},
	{ threshold: 0.5 },
)

document.querySelectorAll(".data-card").forEach((card) => {
	dataObserver.observe(card)
})

document.addEventListener('contextmenu', function(e) {
	// Si l'élément cliqué est une image, on bloque le menu
	if (e.target.tagName === 'IMG') {
		e.preventDefault();
	}
});

// Fonction pour charger le footer
document.addEventListener("DOMContentLoaded", function() {
    // On cherche l'élément placeholder
    const footerPlaceholder = document.getElementById("footer-placeholder");
    
    if (footerPlaceholder) {
        // On récupère le fichier footer.html
        fetch("../HTML/footer.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement du footer");
                }
                return response.text();
            })
            .then(data => {
                // On injecte le HTML
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => {
                console.error("Problème avec le footer :", error);
            });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const logoLink = document.querySelector('.brand-container');

    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});