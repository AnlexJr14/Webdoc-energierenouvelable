// Smooth scrolling for navigation links
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

// Navbar visibility on scroll
let lastScroll = 0
const navbar = document.getElementById("navbar")

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    if (currentScroll > lastScroll) {
      // Scrolling down
      navbar.classList.remove("visible")
    } else {
      // Scrolling up
      navbar.classList.add("visible")
    }
  } else {
    navbar.classList.remove("visible")
  }

  lastScroll = currentScroll
})

// Scroll indicator click
document.querySelector(".scroll-indicator")?.addEventListener("click", () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: "smooth",
  })
})

// Intersection Observer for fade-in animations
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

// Observe elements for animation
document.querySelectorAll(".data-card, .article, .stat-item, .cta-card").forEach((el) => {
  observer.observe(el)
})

// Add parallax effect to hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  if (hero && scrolled < window.innerHeight) {
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`
  }
})

// Counter animation for data numbers (if you add real numbers later)
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

// Observe data cards for counter animation
const dataObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const number = entry.target.querySelector(".data-number")
        if (number && !number.classList.contains("animated")) {
          number.classList.add("animated")
          // You can add counter animation here when you have real numbers
        }
      }
    })
  },
  { threshold: 0.5 },
)

document.querySelectorAll(".data-card").forEach((card) => {
  dataObserver.observe(card)
})

// Console log for debugging
console.log("[v0] Webdoc loaded successfully")
console.log("[v0] All interactive features initialized")
