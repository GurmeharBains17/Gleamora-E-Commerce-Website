let index = 0;
const slides = document.getElementById('slides');
const totalSlides = slides.children.length;
const dotsContainer = document.getElementById('dots');

// ------------------------------
// Create dots
// ------------------------------
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
}
const dots = dotsContainer.querySelectorAll('span');

function showSlide() {
  index = (index + 1) % totalSlides;
  updateSlider();
}

function goToSlide(i) {
  index = i;
  updateSlider();
}

function updateSlider() {
  slides.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}

setInterval(showSlide, 4000);

// ------------------------------
// ✔ 1. HERO SLIDER IMAGES → SCROLL TO TOP CATEGORIES
// ------------------------------
const sliderImages = document.querySelectorAll(".slide img");
sliderImages.forEach(img => {
  img.addEventListener("click", () => {
    document.getElementById("topCategories").scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ------------------------------
// ✔ 2. TOP CATEGORIES / TOP SHELF / OFFERS → SCROLL TO VIRAL FINDS
// ------------------------------

// Top Categories
document.querySelectorAll(".cat-card").forEach(card => {
  card.addEventListener("click", () => {
    document.getElementById("viral").scrollIntoView({ behavior: "smooth" });
  });
});

// Top Shelf section
document.getElementById("top-shelf").addEventListener("click", () => {
  document.getElementById("viral").scrollIntoView({ behavior: "smooth" });
});

// Offers section (4th .section)
const offersSection = document.querySelectorAll(".section")[3];
offersSection.addEventListener("click", () => {
  document.getElementById("viral").scrollIntoView({ behavior: "smooth" });
});

// ------------------------------
// ✔ 3. CLICKING PRODUCT CARDS → OPEN contact.html
// ------------------------------
document.querySelectorAll(".product-card").forEach(card => {
  card.addEventListener("click", () => {
    window.location.href = "contact.html";
  });
});

// ------------------------------
// KEEP YOUR TOP SHELF SCROLL ANIMATION
// ------------------------------
const topShelf = document.getElementById('top-shelf');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      topShelf.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

observer.observe(topShelf);
