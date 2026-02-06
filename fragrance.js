const slides = document.querySelectorAll(".slide");
const sliderDots = document.getElementById("sliderDots");
let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 5000);

// Create dots
slides.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(index));
  sliderDots.appendChild(dot);
});

function updateSlider() {
  document.querySelector(".slider").style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlider();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
  resetInterval();
}

function resetInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);
}
// // JS for future interactivity
// document.querySelectorAll('.fragrance-item').forEach(item => {
//   item.addEventListener('click', () => {
//     const category = item.querySelector('p').innerText;
//     alert(`Filter applied: ${category}`);
//     // Add filter logic here if needed
//   });
// });
// // ----------------------
// HERO SLIDER CLICKS → scroll to fragrance notes section
// ----------------------
document.querySelectorAll(".slide img").forEach(img => {
  img.addEventListener("click", () => {
    document.querySelector(".fragrance-section").scrollIntoView({ behavior: "smooth" });
  });
});


// ----------------------
// SHOP BY FRAGRANCE NOTES, BEST OF PERFUMES, BRANDS TO KNOW
// → scroll to Selling Fast
// ----------------------

// 1️⃣ Shop By Fragrance Notes
document.querySelectorAll(".fragrance-item").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelector(".selling-fast-section").scrollIntoView({ behavior: "smooth" });
  });
});

// 2️⃣ Best Of Perfumes On Offer
document.querySelectorAll(".offer-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelector(".selling-fast-section").scrollIntoView({ behavior: "smooth" });
  });
});

// 3️⃣ Brands To Know
document.querySelectorAll(".brand-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelector(".selling-fast-section").scrollIntoView({ behavior: "smooth" });
  });
});


// ----------------------
// SELLING FAST → Click any product → open contact.html
// ----------------------
document.querySelectorAll(".product-card").forEach(card => {
  card.addEventListener("click", () => {
    window.location.href = "../html/contact.html";
  });
});

// Placeholder for future interactivity like carousel arrows or click events
console.log("Selling Fast section loaded.");
console.log("Brands To Know section loaded");

