let index = 0;
const slides = document.getElementById('slides');
const totalSlides = slides.children.length;
const dotsContainer = document.getElementById('dots');

// Create dots
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

// Scroll animation for Top Shelf
const topShelf = document.getElementById('top-shelf');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      topShelf.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

observer.observe(topShelf);
