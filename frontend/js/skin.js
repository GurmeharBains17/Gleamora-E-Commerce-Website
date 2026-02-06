let index = 0;
const slides = document.getElementById("slides");
const dotsContainer = document.getElementById("dots");
const totalSlides = slides.children.length;

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
