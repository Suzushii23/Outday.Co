document.addEventListener("DOMContentLoaded", () => {
  // HERO SLIDER
  const heroSlides = document.querySelectorAll(".hero-slider .slide");
  const heroTrack = document.querySelector(".hero-slider .slide-track");
  const heroPrev = document.querySelector(".hero-slider .prev");
  const heroNext = document.querySelector(".hero-slider .next");
  let heroIndex = 0;
  let heroTimer;

  function showHeroSlide(idx) {
    heroTrack.style.transition = "transform 0.6s cubic-bezier(.77,0,.18,1)";
    heroTrack.style.transform = `translateX(-${idx * 100}%)`;
  }

  function nextHeroSlide() {
    heroIndex = (heroIndex + 1) % heroSlides.length;
    showHeroSlide(heroIndex);
  }

  function prevHeroSlide() {
    heroIndex = (heroIndex - 1 + heroSlides.length) % heroSlides.length;
    showHeroSlide(heroIndex);
  }

  heroNext.addEventListener("click", () => {
    nextHeroSlide();
    resetHeroTimer();
  });
  heroPrev.addEventListener("click", () => {
    prevHeroSlide();
    resetHeroTimer();
  });

  function resetHeroTimer() {
    clearInterval(heroTimer);
    heroTimer = setInterval(nextHeroSlide, 5000);
  }

  showHeroSlide(heroIndex);
  heroTimer = setInterval(nextHeroSlide, 5000);

  // PRODUCT SLIDER
  const slider = document.querySelector(".product-slider");
  const leftBtn = document.querySelector(".slide-btn.left");
  const rightBtn = document.querySelector(".slide-btn.right");
  const cards = document.querySelectorAll(".product-card");

  let index = 1;
  let isMoving = false;
  const cardWidth = cards[0].offsetWidth + 32; // termasuk gap

  // Clone first and last
  const firstClone = cards[0].cloneNode(true);
  const lastClone = cards[cards.length - 1].cloneNode(true);

  slider.appendChild(firstClone);
  slider.insertBefore(lastClone, cards[0]);

  const allCards = document.querySelectorAll(".product-card");
  slider.style.transform = `translateX(${-cardWidth * index}px)`;

  const moveSlider = () => {
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(${-cardWidth * index}px)`;
  };

  const resetSlider = () => {
    slider.style.transition = "none";
    slider.style.transform = `translateX(${-cardWidth * index}px)`;
    isMoving = false;
  };

  rightBtn.addEventListener("click", () => {
    if (isMoving) return;
    isMoving = true;
    index++;
    moveSlider();
  });

  leftBtn.addEventListener("click", () => {
    if (isMoving) return;
    isMoving = true;
    index--;
    moveSlider();
  });

  slider.addEventListener("transitionend", () => {
    if (index === allCards.length - 1) {
      index = 1;
      resetSlider();
    } else if (index === 0) {
      index = allCards.length - 2;
      resetSlider();
    } else {
      isMoving = false;
    }
  });

  // Responsive resize
  window.addEventListener("resize", () => {
    location.reload(); // refresh biar width-nya pas (alternatif bisa kamu ganti perhitungan ulang cardWidth)
  });
});
