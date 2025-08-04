document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const trigger = document.querySelector(".stop-header-trigger");

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                header.classList.add("hide");
            } else {
                header.classList.remove("hide");
            }
        },
        {
            root: null,
            threshold: 0,
        }
    );

    observer.observe(trigger);
});

document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".gallery__item");

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    obs.unobserve(entry.target); // убираем наблюдение после анимации
                }
            });
        },
        {
            threshold: 0.2,
        }
    );
    images.forEach((img) => observer.observe(img));
});

class SecretsPlacesSlider {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 3;

        this.sliderWrapper = document.getElementById("sliderWrapper");
        this.prevBtn = document.getElementById("prevBtn");
        this.nextBtn = document.getElementById("nextBtn");
        this.dots = document.querySelectorAll(".dot");
        this.currentSlideSpan = document.getElementById("currentSlide");

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateSlider();
    }

    bindEvents() {
        this.prevBtn.addEventListener("click", () => this.prevSlide());
        this.nextBtn.addEventListener("click", () => this.nextSlide());

        this.dots.forEach((dot, index) => {
            dot.addEventListener("click", () => this.goToSlide(index));
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") this.prevSlide();
            if (e.key === "ArrowRight") this.nextSlide();
        });

        let startX = 0;
        let endX = 0;

        this.sliderWrapper.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
        });

        this.sliderWrapper.addEventListener("touchend", (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }

    updateSlider() {
        const translateX = -this.currentSlide * 100;
        this.sliderWrapper.style.transform = `translateX(${translateX}%)`;

        this.updateDots();
        this.updateCounter();
    }

    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === this.currentSlide);
        });
    }

    updateCounter() {
        this.currentSlideSpan.textContent = this.currentSlide + 1;
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
    }

    prevSlide() {
        this.currentSlide =
            (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider();
    }

    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateSlider();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new SecretsPlacesSlider();
});

const toggleButtons = document.querySelectorAll(".toggle-btn");

toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const text = btn.previousElementSibling; // Находим <p> перед кнопкой
        text.classList.toggle("expanded");
        btn.textContent = text.classList.contains("expanded")
            ? "Hide"
            : "Show more";
    });
});
