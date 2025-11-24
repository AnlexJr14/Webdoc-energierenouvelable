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

console.log("[v0] Webdoc loaded successfully")
console.log("[v0] All interactive features initialized")
