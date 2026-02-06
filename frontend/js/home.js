document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  let index = 0;
  let interval;

  function showSlide(i) {
    slides.forEach((slide, idx) => {
      slide.classList.remove("active");
      dots[idx].classList.remove("active");
    });
    slides[i].classList.add("active");
    dots[i].classList.add("active");
    index = i;
  }

  // Auto slide
  function startAutoSlide() {
    interval = setInterval(() => {
      index = (index + 1) % slides.length;
      showSlide(index);
    }, 15000); // 15 sec
  }

  // Manual click
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      clearInterval(interval); // reset timer when user clicks
      showSlide(i);
      startAutoSlide();
    });
  });

  // Start auto sliding
  startAutoSlide();
});
// Scroll buttons functionality
const scrollBtns = document.querySelectorAll(".scroll-btn");

scrollBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = document.querySelector(btn.dataset.target);
    target.scrollBy({
      left: btn.dataset.direction === "right" ? 300 : -300,
      behavior: "smooth"
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const productList = document.querySelector(".product-list");
  const scrollBtns = document.querySelectorAll(".scroll-btn");

  scrollBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("left")) {
        productList.scrollBy({ left: -300, behavior: "smooth" });
      } else {
        productList.scrollBy({ left: 300, behavior: "smooth" });
      }
    });
  });
});
document.querySelectorAll(".scroll-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const container = btn.parentElement.querySelector(".trending-list");
    const scrollAmount = 300;
    if (btn.classList.contains("left")) {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  });
});
const carousel = document.getElementById('brandsCarousel');
const nextBtn = document.getElementById('nextBtn');

nextBtn.addEventListener('click', () => {
  // Scroll by width of one card + gap (approx 34% of carousel width)
  const scrollAmount = carousel.offsetWidth * 0.34; 
  carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const emailInput = this.querySelector('input[type="email"]');
  alert(`Thank you for subscribing, ${emailInput.value}!`);
  emailInput.value = '';
});
  document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    let index = 0;
    const itemWidth = 265; // width + margin

    nextBtn.addEventListener('click', () => {
      index++;
      if (index >= track.children.length) index = 0; // reset to start
      track.style.transform = `translateX(${-index * itemWidth}px)`;
    });

    prevBtn.addEventListener('click', () => {
      index--;
      if (index < 0) index = track.children.length - 1; // loop back
      track.style.transform = `translateX(${-index * itemWidth}px)`;
    });
  });