document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevButton = document.querySelector('.carousel-controls .prev');
    const nextButton = document.querySelector('.carousel-controls .next');
    
    let currentSlide = 0;

    function updateSlides(newIndex) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[newIndex].classList.add('active');
        dots[newIndex].classList.add('active');
        
        currentSlide = newIndex;
    }

    // Event listeners for next/prev buttons
    nextButton.addEventListener('click', () => {
        let newIndex = (currentSlide + 1) % slides.length;
        updateSlides(newIndex);
    });

    prevButton.addEventListener('click', () => {
        let newIndex = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides(newIndex);
    });

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateSlides(index);
        });
    });

    // Add autoplay functionality
    let autoplayInterval;
    const AUTOPLAY_DELAY = 5000; // 5 seconds

    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            let newIndex = (currentSlide + 1) % slides.length;
            updateSlides(newIndex);
        }, AUTOPLAY_DELAY);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Start autoplay initially
    startAutoplay();

    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Stop autoplay when user interacts with controls
    [prevButton, nextButton, ...dots].forEach(control => {
        control.addEventListener('click', () => {
            stopAutoplay();
            setTimeout(startAutoplay, AUTOPLAY_DELAY);
        });
    });
}); 