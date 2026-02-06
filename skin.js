// ----------------------
// SLIDER SETUP
// ----------------------
let index = 0;
const slides = document.getElementById("slides");
const dotsContainer = document.getElementById("dots");
const totalSlides = slides.children.length;

// Create dots
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement("span");
  dot.addEventListener("click", () => moveToSlide(i));
  dotsContainer.appendChild(dot);
}

function updateDots() {
  [...dotsContainer.children].forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function moveToSlide(i) {
  index = i;
  slides.style.transform = `translateX(${-index * 100}%)`;
  updateDots();
}

function autoSlide() {
  index = (index + 1) % totalSlides;
  moveToSlide(index);
}

moveToSlide(0);
setInterval(autoSlide, 3000);

// ----------------------
// SCROLL FUNCTIONS
// ----------------------
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// ----------------------
// CLICK SLIDE IMAGES → SCROLL TO CATEGORIES
// ----------------------
document.querySelectorAll(".slide img").forEach(img => {
  img.addEventListener("click", () => {
    scrollToSection("topCategories");
  });
});

// ----------------------
// CLICK TOP CATEGORIES → SCROLL TO FESTIVE
// ----------------------
document.querySelectorAll(".cat-card").forEach(card => {
  card.addEventListener("click", () => {
    scrollToSection("festiveSection");
  });
});

// ----------------------
// CLICK INGREDIENTS & BRANDS → SCROLL TO BEST OF SKINCARE
// ----------------------
document.querySelectorAll(".ingredient-card, .brand-card").forEach(card => {
  card.addEventListener("click", () => {
    scrollToSection("bestSkin");
  });
});

// ----------------------
// CLICK ANY PRODUCT → OPEN contact.html
// ----------------------
document.querySelectorAll(".product-card, .recommend-card").forEach(card => {
  card.addEventListener("click", () => {
    window.location.href = "../html/contact.html";
  });
});
